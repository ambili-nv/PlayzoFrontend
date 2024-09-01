import { useFormik } from 'formik';
import { IoClose } from 'react-icons/io5';
import { useCallback, useState } from 'react';
import axios from 'axios';
import { OWNER_API } from '../../../constants'; // Adjust the path if necessary
import showToast from '../../../utils/toaster';
import * as Yup from 'yup';
import { ownerBookingPdfGenerator,
  //  ownerArrayToExcel
   } from '../../../utils/exportData';
import axiosInstance from '../../../utils/axiosInstance';

const validationSchema = Yup.object().shape({
  startDate: Yup.date().required('Start date is required'),
  endDate: Yup.date()
    .required('End date is required')
    .min(Yup.ref('startDate'), 'End date must be after start date'),
});

const ReportRequestModal: React.FC<{ isModalOpen: (isOpen: boolean) => void }> = ({ isModalOpen }) => {
  const [hasData, setHasData] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]); // Adjust with actual data type
  const formik = useFormik({
    initialValues: {
      startDate: '',
      endDate: '',
    },
    validationSchema,
    onSubmit: async ({ startDate, endDate }) => {
      try {
        const response = await axiosInstance.get(`${OWNER_API}/generate-report`, {
          params: { startDate, endDate },
        });
        console.log(response.data.report.bookings,"report data");
        console.log(response.data.report.totalAmount,"total-amount");
        console.log(response.data.report," data ");
        
        setData(response.data.report.bookings);
        setHasData(response.data.report.bookings.length > 0);
      } catch (error) {
        showToast('Oops! Something went wrong', 'error');
      }
    },
  });

  

  // const exportFile = useCallback(() => {
  //   try {
  //     const fileName = `${formik.values.startDate}-${formik.values.endDate} Report.xls`;
  //     ownerArrayToExcel.convertArrayToTable(data, fileName);
  //   } catch (error) {
  //     console.error('Error in generating Excel', error);
  //   }
  // }, [data, formik.values]);

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-50 flex justify-center items-center`}
    >
      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-2">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Generate Report</h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto flex justify-center items-center"
            onClick={() => isModalOpen(false)}
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 md:p-5">
          <form className="grid gap-4 mb-4" onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="startDate" className="block mb-2 text-sm font-medium text-gray-900">From</label>
              <input
                type="date"
                id="startDate"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                {...formik.getFieldProps('startDate')}
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block mb-2 text-sm font-medium text-gray-900">To</label>
              <input
                type="date"
                id="endDate"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                {...formik.getFieldProps('endDate')}
              />
            </div>
            {formik.errors.endDate && (
              <p className="text-red-500">{formik.errors.endDate}</p>
            )}
            <div>
              <button
                type="submit"
                className="text-white w-full bg-green-500 hover:bg-green-600 focus:ring-green-400 focus:ring-2 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Generate Report
              </button>
            </div>
          </form>
          {hasData && data.length > 0 && (
            <div className="flex justify-between gap-2">
              <button
                className="text-white w-full bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={() =>
                  ownerBookingPdfGenerator(
                    data,
                    //@ts-ignore
                    formik.values.startDate,
                    formik.values.endDate,
                    'Booking Report'
                  )
                }
              >
                Download PDF
              </button>
              {/* <button
                className="text-white w-full bg-gray-500 hover:bg-gray-600 focus:ring-green-400 focus:ring-2 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={exportFile}
              >
                Download Excel
              </button> */}
            </div>
          )}
          {!hasData && <p className="text-center text-gray-500 mt-4">No matching data for the selected dates</p>}
        </div>
      </div>
    </div>
  );
};

export default ReportRequestModal;


