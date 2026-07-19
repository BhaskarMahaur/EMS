import Employee, {
  Status,
} from "../models/Employee";

export const getDashboardStats = async () => {

  const totalEmployees =
    await Employee.countDocuments({
      isDeleted: false,
    });

  const activeEmployees =
    await Employee.countDocuments({
      isDeleted: false,
      status: Status.ACTIVE,
    });

  const inactiveEmployees =
    await Employee.countDocuments({
      isDeleted: false,
      status: Status.INACTIVE,
    });

  const departments =
    await Employee.distinct(
      "department",
      {
        isDeleted: false,
      }
    );

  const departmentStats =
    await Employee.aggregate([
      {
        $match: {
          isDeleted: false,
        },
      },
      {
        $group: {
          _id: "$department",
          employees: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          _id: 0,
          department: "$_id",
          employees: 1,
        },
      },
      {
        $sort: {
          employees: -1,
        },
      },
    ]);

  return {

    totalEmployees,

    activeEmployees,

    inactiveEmployees,

    departmentCount: departments.length,

    departmentStats,

  };

};