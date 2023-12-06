import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect } from 'chai';

import SeoHelmet from 'utils/SeoHelmet';

describe('SeoHelmet', () => {
  it('should render the correct title', () => {
    const title = 'Test Title';
    render(<SeoHelmet title={title} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('should render the correct description', () => {
    const description = 'Test Description';
    render(<SeoHelmet description={description} />);
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('should render the correct keywords', () => {
    const keywords = 'test1, test2, test3';
    render(<SeoHelmet keywords={keywords} />);
    expect(screen.getByText(keywords)).toBeInTheDocument();
  });

  it('should render the correct name', () => {
    const name = 'Test Name';
    render(<SeoHelmet name={name} />);
    expect(screen.getByText(name)).toBeInTheDocument();
  });

  it('should render the correct type', () => {
    const type = 'Test Type';
    render(<SeoHelmet type={type} />);
    expect(screen.getByText(type)).toBeInTheDocument();
  });
});
