import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    BadRequestException,
  } from '@nestjs/common';
  import { Response } from 'express';
  import { Error as MongooseError } from 'mongoose';
  
  @Catch(MongooseError.ValidationError)
  export class MongooseValidationFilter implements ExceptionFilter {
    catch(exception: MongooseError.ValidationError, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
  
      const errors = Object.values(exception.errors).map((err) => err.message);
  
      response.status(400).json({
        statusCode: 400,
        message: 'Validation failed',
        errors, // 🔥 return an array of messages ["Path `user` is required."]
      });
    }
  }
  