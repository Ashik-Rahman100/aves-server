import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PropertyServices } from './property.service';

const createProperty = catchAsync(async (req, res) => {
  const result = await PropertyServices.createPropertyIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Property is created successfully',
    data: result,
  });
});

const getAllProperties = catchAsync(async (req, res) => {
  const result = await PropertyServices.getAllPropertiesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Property are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

// const getSingleCourse = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const result = await CourseServices.getSingleCourseFromDB(id);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Course is retrieved successfully',
//     data: result,
//   });
// });

// const updateCourse = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const result = await CourseServices.updateCourseIntoDB(id, req.body);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'course is updated successfully',
//     data: result,
//   });
// });

// const deleteCourse = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const result = await CourseServices.deleteCourseFromDB(id);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Course is deleted successfully',
//     data: result,
//   });
// });

export const PropertyControllers = { createProperty, getAllProperties };
