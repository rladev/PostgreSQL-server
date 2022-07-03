import { db } from "../models"
import { Request, Response } from 'express'
import Sequelize from "sequelize"
import noteService from './../services/notes'

const Notes = db.notes 
const Op = Sequelize.Op

export const create = async (req: Request, res: Response) => {
    try {
        const params = req.body.params;  

        // console.log("params is", params)
        const result = await noteService.createOne(params)
        return res.json({ success: true, message: 'Success', data: result })  
    } catch(e) {
      return res.status(500).json({success: false, message: 'update failed'})
    }
       
}

export const findAll = async (req: Request, res: Response) => {
  try {
    const params: any = JSON.parse(req.query.params as string)
    // const params: any = req.query.params
    // console.log("params is", JSON.parse(req.query.params as string))
    
    if (params === undefined) {
      return res.status(400).json({success: false, message: 'Cannot find data'})
    }
    const condition = {
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: `%${params.searchValue}%`
            }
          },
          {
            description: {    
              [Op.like]: `%${params.searchValue}%`              
            }
          }
        ]
      },
      order: [[params.column, params.direction]],
      limit: params.rowsPerPage,
      offset: (params.currentPage - 1) * params.rowsPerPage
    }
    const result = await noteService.findAndCountAll(condition)
  
    // console.log("params data", result)
  
    return res.json({ success: true, message: 'Success', data: result})
  } catch(e) {
    return res.status(500).json({success: false, message: 'GetData failed'})
  }


}

export const findOne = (req: Request, res: Response) => {
    const { id } = req.params;
    Notes.findByPk(id)
        .then((data) => {
        res.send(data);
        })
        .catch((err) => {
        res.status(500).send({
            message: `Error retrieving Notes with id=${id}`,
        });
    });
}

export const update = async (req: Request, res: Response) => {
  try {
    const params = req.body.params;
    // console.log("params", params)
    const condition = { where: { id: params.id }}
    const result = await noteService.updateOne(params, condition)
    return res.json({ success: true, message: 'Success', data: result})
  } catch(e) {
    return res.status(500).json({success: false, message: 'Update failed'})
  }
    
}

export const deleteOne = async (req: Request, res: Response) => {
  try {
    const id = req.query.id;
    // console.log("id data is", id)
    const result = await noteService.destroy({
      where: { id },
    })
    return res.json({ success: true, message: 'Success', data: result })
  } catch(e) {
    return res.status(500).json({success: false, message: 'Delete failed'})
  }
   
}