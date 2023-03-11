import { Request, Response } from "express";
import LineMan from "../models/LineMan.model";

import decodeJWT from "../utils/decodeJWT";

export const getAllLineMen = async (req: Request, res: Response) => {
  const lineMen = await LineMan.findAll({
    attributes: {
      exclude: ["DeletedGUID", "DeletedDate"],
    },
  });
  res.status(200).json({
    message: "All linemen fetched successfully",
    lineMen,
  });
};

export const getLineManById = async (req: Request, res: Response) => {
  const { LineManGUID } = req.params;

  const lineMan = await LineMan.findByPk(LineManGUID, {
    attributes: {
      exclude: ["DeletedGUID", "DeletedDate"],
    },
  });
  if (!lineMan) {
    res.status(404).json({
      message: "LineMan not found",
    });
  } else {
    res.status(200).json({
      message: "LineMan fetched successfully",
      lineMan,
    });
  }
};

export const createLineMan = async (req: Request, res: Response) => {
  if (req.body.user) {
    req.body.CreatedGUID = req.body.user.UserGUID;
  } else {
    req.body.CreatedGUID = decodeJWT(req).UserGUID;
  }

  const lineMan = await LineMan.create(req.body);

  res.status(201).json({
    message: "LineMan created successfully",
    lineMan,
  });
};

export const updateLineMan = async (req: Request, res: Response) => {
  if (req.body.user) {
    req.body.ModifiedGUID = req.body.user.UserGUID;
  } else {
    req.body.ModifiedGUID = decodeJWT(req).UserGUID;
  }

  const { LineManGUID } = req.params;

  const lineMan = await LineMan.findByPk(LineManGUID);
  if (!lineMan) {
    res.status(404).json({
      message: "LineMan not found",
    });
  } else {
    if (req.body.user) {
      req.body.ModifiedGUID = req.body.user.UserGUID;
    } else {
      req.body.ModifiedGUID = decodeJWT(req).UserGUID;
    }
    await lineMan.update(req.body);
    res.status(200).json({
      message: "LineMan updated successfully",
      lineMan,
    });
  }
};

export const deleteLineMan = async (req: Request, res: Response) => {
  if (req.body.user) {
    req.body.DeletedGUID = req.body.user.UserGUID;
  } else {
    req.body.DeletedGUID = decodeJWT(req).UserGUID;
  }

  const { LineManGUID } = req.params;

  const lineMan = await LineMan.findByPk(LineManGUID);
  if (!lineMan) {
    res.status(404).json({
      message: "LineMan not found",
    });
  } else {
    if (req.body.user) {
      req.body.DeletedGUID = req.body.user.UserGUID;
    } else {
      req.body.DeletedGUID = decodeJWT(req).UserGUID;
    }
    await lineMan.update(req.body);
    res.status(200).json({
      message: "LineMan deleted successfully",
      lineMan,
    });
  }
};
