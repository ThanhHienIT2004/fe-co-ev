// app/ownership-groups-manage/[groupId]/add-member/useAddMemberLogic.ts
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGroupMembers, useCreateGroupMember } from '@/libs/hooks/useGroupMembers';

export function useAddMemberLogic(groupId: string) {
  const router = useRouter();
  const { members } = useGroupMembers(groupId);
  const { createMember } = useCreateGroupMember();

  const [userId, setUserId] = useState('');
  const [groupRole, setGroupRole] = useState('Co-owner');
  const [ownershipRatio, setOwnershipRatio] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const isMemberExist = members.some(m => m.user_id === userId.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId.trim() || !groupId) return;
    if (isMemberExist) {
      setErrorMsg('Thành viên này đã có trong nhóm!');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');
    setSuccess(false);

    try {
      await createMember({
        group_id: groupId,
        user_id: userId.trim(),
        group_role: groupRole,
        ownership_ratio: ownershipRatio ? Number(ownershipRatio) : undefined,
      });

      setSuccess(true);
      setUserId('');
      setOwnershipRatio('');
      setGroupRole('Co-owner');

      setTimeout(() => router.push('/ownership-groups-manage'), 1500);
    } catch (err: any) {
      const msg = err.response?.data?.message;
      setErrorMsg(Array.isArray(msg) ? msg.join(', ') : (msg || 'Thêm thất bại'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    userId,
    setUserId,
    groupRole,
    setGroupRole,
    ownershipRatio,
    setOwnershipRatio,
    isSubmitting,
    success,
    errorMsg,
    isMemberExist,
    handleSubmit,
  };
}