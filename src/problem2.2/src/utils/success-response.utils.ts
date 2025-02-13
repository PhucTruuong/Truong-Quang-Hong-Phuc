import { Response } from "express";
import HttpStatusCodes from "../constants/HttpStatusCode";

export const sendSuccessResponse = (res: Response, status: HttpStatusCodes , data: object | undefined) => {
  return res.status(200).json({ success: true, status , data });
};

export const sendSuccessResponseWithMessage = (res: Response, status: HttpStatusCodes , message: string) => {
  return res.status(200).json({ success: true, status , message });
};