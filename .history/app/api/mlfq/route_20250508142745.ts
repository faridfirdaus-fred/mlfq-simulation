import { NextApiRequest, NextApiResponse } from "next";
import { simulateMLFQ } from "../../../lib/apiClient";
import { Process } from "../../../api/utils/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const processes: Process[] = req.body;
      const result = await simulateMLFQ(processes);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
