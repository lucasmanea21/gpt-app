import axios from "axios";
import { API_URL } from "../../../utils/config";

export const handleStepIncrement = async (roomId: string, setStep: any) => {
  try {
    const response = await axios.put(`${API_URL}/rooms/${roomId}/next_step`, {
      ownerId: "7a9f5e1f-1e20-4e7c-9201-418f27b5510c",
    });

    response && setStep(response.data.step);
    return response.data;
  } catch (error: any) {
    throw new Error("Failed to update step");
  }
};

export const createRoom = async (subject: string, ownerId: string) => {
  try {
    const response = await axios.post(`${API_URL}/rooms/create`, {
      subject,
      ownerId,
    });

    return response.data.id;
  } catch (error: any) {
    console.error(error.message);

    return error.message;
  }
};
