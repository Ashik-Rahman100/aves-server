import QueryBuilder from '../../builder/QueryBuilder';
import { PropertySearchableFields } from './property.constant';
import { TProperty } from './property.interface';
import { Property } from './property.model';

const createPropertyIntoDB = async (payload: TProperty) => {
  const result = await Property.create(payload);
  return result;
};

const getAllPropertiesFromDB = async (query: Record<string, unknown>) => {
  const propertyQuery = new QueryBuilder(Property.find(), query)
    .search(PropertySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await propertyQuery.modelQuery;
  const meta = await propertyQuery.countTotal();

  return {
    meta,
    result,
  };
};

// const getSingleCourseFromDB = async (id: string) => {
//   const result = await Course.findById(id).populate(
//     'preRequisiteCourses.course',
//   );
//   return result;
// };

// const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
//   const { preRequisiteCourses, ...courseRemainingData } = payload;

//   const session = await mongoose.startSession();

//   try {
//     session.startTransaction();

//     //step1: basic course info update
//     const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
//       id,
//       courseRemainingData,
//       {
//         new: true,
//         runValidators: true,
//         session,
//       },
//     );

//     if (!updatedBasicCourseInfo) {
//       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
//     }

//     // check if there is any pre requisite courses to update
//     if (preRequisiteCourses && preRequisiteCourses.length > 0) {
//       // filter out the deleted fields
//       const deletedPreRequisites = preRequisiteCourses
//         .filter((el) => el.course && el.isDeleted)
//         .map((el) => el.course);

//       const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
//         id,
//         {
//           $pull: {
//             preRequisiteCourses: { course: { $in: deletedPreRequisites } },
//           },
//         },
//         {
//           new: true,
//           runValidators: true,
//           session,
//         },
//       );

//       if (!deletedPreRequisiteCourses) {
//         throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
//       }

//       // filter out the new course fields
//       const newPreRequisites = preRequisiteCourses?.filter(
//         (el) => el.course && !el.isDeleted,
//       );

//       const newPreRequisiteCourses = await Course.findByIdAndUpdate(
//         id,
//         {
//           $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
//         },
//         {
//           new: true,
//           runValidators: true,
//           session,
//         },
//       );

//       if (!newPreRequisiteCourses) {
//         throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
//       }
//     }

//     await session.commitTransaction();
//     await session.endSession();

//     const result = await Course.findById(id).populate(
//       'preRequisiteCourses.course',
//     );

//     return result;
//   } catch (err) {
//     await session.abortTransaction();
//     await session.endSession();
//     throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
//   }
// };

// const deleteCourseFromDB = async (id: string) => {
//   const result = await Course.findByIdAndUpdate(
//     id,
//     { isDeleted: true },
//     {
//       new: true,
//     },
//   );
//   return result;
// };

export const PropertyServices = {
  createPropertyIntoDB,
  getAllPropertiesFromDB,
};
