import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SectionPage from '../../Pages/SectionPage'

describe('SectionPage Component', () => {
  const mockSectionData = {
    currentSection: 'Billing',
    hash: 'overview',
    data: {
      subtopics: [
        {
          title: 'Overview',
          subsections: [
            {
              subTitle: 'Web Interface',
              paragraph:
                'The web interface provides a comprehensive view of your billing information. You can manage your payment methods, view invoices, and track your spending through an intuitive dashboard. This section covers all the functionalities available through the web interface. With features like real-time updates, customizable views, and detailed analytics, the web interface allows you to have complete control over your billing data. You can easily navigate through different sections, apply filters, and generate reports to better understand your financial activities.',
            },
          ],
        },
        {
          title: 'Payment Methods',
          subsections: [
            {
              subTitle: 'Overview of Payment Methods',
              paragraph:
                'This section provides an overview of available payment methods.',
            },
          ],
        },
      ],
    },
  }

  it('renders section title and subsections correctly', () => {
    render(<SectionPage {...mockSectionData} />)

    expect(screen.getAllByText('Overview').length).toBeGreaterThan(0)

    expect(screen.getByText('Introduction')).toBeInTheDocument()
    expect(screen.getByText('Details')).toBeInTheDocument()
    expect(screen.getByText('Payment Details')).toBeInTheDocument()
  })
})
