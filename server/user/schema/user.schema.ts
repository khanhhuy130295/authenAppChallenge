import {
    Schema
} from 'mongoose'
import { User } from '../entities/user.entity'
import {
    UserStatus
} from '../user.enum'

export const UserSchema = new Schema(
    {
        _id: {
            type: Number,
            required: true
        },
        extension: {
            status: {
                type: Number,
                default: UserStatus.Active
            }
        }
    },
    {
        timestamps: {
          createdAt: 'doc_created_at',
          updatedAt: 'doc_updated_at'
        }
    }
)