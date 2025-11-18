'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import SignaturePad from './signaturePad';
import { SignatureType } from '@/types/digital-signature.type';
import { UsageRecord as UsageType } from '@/types/usage.type';
import { useDigitalSignatureOwner } from '@/libs/hooks/useDigitalSignature.Owner';

interface SignModalProps {
  isOpen: boolean;
  onClose: () => void;
  usage: UsageType;
  userId?: number; // optional, SignModal will tolerate missing userId
  onSuccess: () => void;
  // optional initial type so caller can open directly to signing a specific type
  initialType?: SignatureType | null;
}

export default function SignModal({ isOpen, onClose, usage, userId, onSuccess, initialType }: SignModalProps) {
  const [step, setStep] = useState<'select' | 'sign'>('select');
  const [type, setType] = useState<SignatureType | null>(null);
  const [signatureData, setSignatureData] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const { createSignature } = useDigitalSignatureOwner();

  // support both naming conventions (with or without underscore)
  const realCheckIn = (usage as any).checkin_time ?? usage.check_in_time ?? null;
  const realCheckOut = (usage as any).checkout_time ?? usage.check_out_time ?? null;
  const canCheckIn = !realCheckIn;
  const canCheckOut = Boolean(realCheckIn) && !realCheckOut;

  const handleSign = async () => {
    if (!type || !signatureData) return;

    setLoading(true);
    try {
      await createSignature({
        user_id: userId || 0,
        usage_id: usage.usage_id,
        type,
        signature_data: signatureData,
      });
      onSuccess();
      handleClose();
    } catch (err: any) {
      alert(err?.message || 'Ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  // if caller passed initialType and modal opened, go straight to sign step
  useEffect(() => {
    if (initialType && isOpen) {
      setType(initialType);
      setStep('sign');
    }
  }, [initialType, isOpen]);

  // open directly to sign if initialType provided
  // (set by caller when user clicks "Ký" on a specific cell)
  // We need to watch for changes to usage or initialType via props; useEffect would be best,
  // but to keep this file self-contained we set type/step from initialType if present

  const handleClose = () => {
    setStep('select');
    setType(null);
    setSignatureData('');
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"

  // if caller passes initialType via props, open sign step directly
  // we can't destructure initialType earlier because of type positions, so read from (props as any)
  // but better to use (arguments) - since props includes initialType we can access via (SignModal's params)
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-lg font-bold text-gray-900">
                  {step === 'select' ? 'Chọn loại ký' : 'Ký xác nhận'}
                </Dialog.Title>

                {step === 'select' ? (
                  <div className="mt-4 space-y-3">
                    <p className="text-sm text-gray-600">
                      Booking ID: <strong>{usage.booking_id}</strong>
                    </p>
                    <div className="space-y-2">
                      {canCheckIn && (
                        <button
                          onClick={() => {
                            setType(SignatureType.CHECKIN);
                            setStep('sign');
                          }}
                          className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-blue-50 transition"
                        >
                          <div className="font-medium text-blue-700">Ký nhận xe (Check-in)</div>
                          <div className="text-xs text-gray-500">Xác nhận đã nhận xe</div>
                        </button>
                      )}
                      {canCheckOut && (
                        <button
                          onClick={() => {
                            setType(SignatureType.CHECKOUT);
                            setStep('sign');
                          }}
                          className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-green-50 transition"
                        >
                          <div className="font-medium text-green-700">Ký trả xe (Check-out)</div>
                          <div className="text-xs text-gray-500">Xác nhận đã trả xe</div>
                        </button>
                      )}
                      {!canCheckIn && !canCheckOut && (
                        <p className="text-sm text-gray-500 text-center py-4">
                          Đã hoàn tất ký nhận và trả xe
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-3">
                      {type === SignatureType.CHECKIN ? 'Ký nhận xe' : 'Ký trả xe'}
                    </p>
                    <SignaturePad
                      onSave={setSignatureData}
                      onClear={() => setSignatureData('')}
                    />
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => setStep('select')}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
                      >
                        Quay lại
                      </button>
                      <button
                        onClick={handleSign}
                        disabled={!signatureData || loading}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? 'Đang lưu...' : 'Xác nhận ký'}
                      </button>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
