import React from 'react';

const ColumnHeadings = ({headings}) => {
  return headings.map((headingText, i) => <th key={i}>{headingText}</th>);
};

export default ColumnHeadings;
