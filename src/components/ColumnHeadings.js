import React from 'react';

const ColHeadings = ({ headings }) => {
  return headings.map((headingText, i) => <th key={i}>{headingText}</th>);
};

export default ColHeadings;
