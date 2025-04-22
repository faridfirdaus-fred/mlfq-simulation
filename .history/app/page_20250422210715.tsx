const simulateMLFQ = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/simulate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify([{ pid: "P1", arrival_time: 0, burst_time: 5 }]),
  });

  const data = await res.json();
  console.log("Hasil dari backend:", data);
};
