import mongoose, { Document, Schema, Types } from 'mongoose';

interface ICarBase {
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  color: string;
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  transmission: 'manual' | 'automatic';
  available: boolean;
  features: string[];
  images: string[];
  description: string;
  category: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICar extends Omit<Document, 'model'>, ICarBase {}

const carSchema = new Schema<ICar>(
  {
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      trim: true,
    },
    model: {
      type: String,
      required: [true, 'Model is required'],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
      min: [1900, 'Year must be after 1900'],
      max: [new Date().getFullYear() + 1, 'Year cannot be in the future'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    mileage: {
      type: Number,
      required: [true, 'Mileage is required'],
      min: [0, 'Mileage cannot be negative'],
    },
    color: {
      type: String,
      required: [true, 'Color is required'],
      trim: true,
    },
    fuelType: {
      type: String,
      required: [true, 'Fuel type is required'],
      enum: {
        values: ['petrol', 'diesel', 'electric', 'hybrid'],
        message: 'Invalid fuel type',
      },
    },
    transmission: {
      type: String,
      required: [true, 'Transmission is required'],
      enum: {
        values: ['manual', 'automatic'],
        message: 'Invalid transmission type',
      },
    },
    available: {
      type: Boolean,
      default: true,
    },
    features: [
      {
        type: String,
        trim: true,
      },
    ],
    images: [
      {
        type: String,
        trim: true,
      },
    ],
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters long'],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better query performance
carSchema.index({ brand: 1, model: 1 });
carSchema.index({ price: 1 });
carSchema.index({ available: 1 });
// carSchema.index({ category: 1 });

const Car = mongoose.model<ICar>('Car', carSchema);

export default Car;
