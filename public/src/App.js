import React, { useState, useMemo } from 'react';
import Pagination from './Pagination';
import data from './data/mock-data.json';
import './style.css';

/* Props:
  totalCount: represents the total count of data available from the source.
  currentPage: represents the current active page. We'll use a 1-based index instead of a traditional 0-based index for our currentPage value.
  pageSize: represents the maximum data that is visible in a single page.
  onPageChange: callback function invoked with the updated page value when the page is changed.
  siblingCount (optional): represents the min number of page buttons to be shown on each side of the current page button. Defaults to 1.

  usePagination hook to compute page ranges
    parameters: totalCount , currentPage , pageSize , siblingCount
    return an array containign range of numbers to be displayed in pagination component and needs to re-run when any of the parameters change
    total number of items in the array should remain constant to avoid resizing pagination component

  4 possible states for the pagination component
  - Total page count is less than the page pills we want to show. In such a case we just return the range from 1 to totalPageCount.
  - Total page count is greater than the page pills but only the right DOTS are visible.
  - Total page count is greater than the page pills but only the left DOTS are visible.
  - Total page count is greater than the page pills and both the left and the right DOTS are visible.
*/

let PageSize = 10;

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>FIRST NAME</th>
            <th>LAST NAME</th>
            <th>EMAIL</th>
            <th>PHONE</th>
          </tr>
        </thead>
        <tbody>
          {currentTableData.map((item) => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};
