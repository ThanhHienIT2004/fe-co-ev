
export async function getVehicles(): Promise<Vehicle[]> {
  const res = await fetch('http://localhost:3001/vehicles', {
    // Tự động revalidate mỗi 60s (ISR)
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Không thể tải danh sách xe');
  }

  return res.json();
}