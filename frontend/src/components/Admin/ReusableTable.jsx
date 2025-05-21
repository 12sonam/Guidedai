import React from 'react';

const ReusableTable = ({ columns, data, loading }) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      {loading ? (
        <div className="p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-600 mx-auto"></div>
        </div>
      ) : data.length === 0 ? (
        <div className="p-6 text-center text-gray-500">No data found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-600">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.header}
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((row, index) => (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover-scale smooth-transition`}>
                  {columns.map((column) => (
                    <td key={column.accessor} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {column.render ? column.render(row[column.accessor], row) : row[column.accessor] || '—'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReusableTable;