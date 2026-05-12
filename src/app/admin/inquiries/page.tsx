import React from 'react';
import styles from '../admin.module.css';

const dummyInquiries = [
  {
    id: 'INQ-101',
    name: 'Vikram Singh',
    email: 'vikram.s@example.com',
    phone: '+91 98765 43210',
    subject: 'Custom Engagement Ring',
    date: 'Oct 12, 2023',
    status: 'New',
  },
  {
    id: 'INQ-102',
    name: 'Neha Kapoor',
    email: 'neha.k@example.com',
    phone: '+91 91234 56789',
    subject: 'Order Status Inquiry',
    date: 'Oct 11, 2023',
    status: 'Pending',
  },
  {
    id: 'INQ-103',
    name: 'Rohan Gupta',
    email: 'rohan.g@example.com',
    phone: '+91 99887 76655',
    subject: 'Book Appointment for Bridal Set',
    date: 'Oct 10, 2023',
    status: 'Resolved',
  },
  {
    id: 'INQ-104',
    name: 'Sanya Malhotra',
    email: 'sanya.m@example.com',
    phone: '+91 98761 12345',
    subject: 'General Inquiry - Shipping',
    date: 'Oct 09, 2023',
    status: 'Resolved',
  }
];

export default function InquiriesPage() {
  return (
    <div>
      <h1 style={{ marginBottom: '2rem', color: '#1A1A1A' }}>Customer Inquiries & Leads</h1>
      
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <h2>Recent Messages from Contact Page</h2>
        </div>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer Name</th>
              <th>Contact Details</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dummyInquiries.map((inq) => (
              <tr key={inq.id}>
                <td style={{ fontWeight: 500 }}>{inq.id}</td>
                <td>{inq.name}</td>
                <td>
                  <div>{inq.email}</div>
                  <div style={{ fontSize: '0.8rem', color: '#717171', marginTop: '4px' }}>{inq.phone}</div>
                </td>
                <td>{inq.subject}</td>
                <td>{inq.date}</td>
                <td>
                  <span className={`${styles.badge} ${
                    inq.status === 'New' ? styles.new : 
                    inq.status === 'Pending' ? styles.pending : styles.resolved
                  }`}>
                    {inq.status}
                  </span>
                </td>
                <td>
                  <button className={styles.actionBtn}>View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
