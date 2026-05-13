"use client";

import React, { useState } from 'react';
import { User, Lock, Upload, Plus, Trash2, Save, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'team' | 'security'>('profile');
  
  // Profile State
  const [profileImg, setProfileImg] = useState('/avatar-placeholder.png');
  
  // Security State
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

  // Team State
  const [team, setTeam] = useState([
    { id: 1, name: 'Sriyansh Nahar', email: 'admin@diamond.com', role: 'Super Admin', status: 'Active' },
    { id: 2, name: 'Manager', email: 'manager@diamond.com', role: 'Editor', status: 'Active' }
  ]);

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f9f9f9', minHeight: '80vh' }}>
      <h1 style={{ fontSize: '1.8rem', color: 'var(--color-black)', fontFamily: 'var(--font-heading)', marginBottom: '2rem' }}>
        Store Settings
      </h1>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {/* Sidebar Tabs */}
        <div style={{ flex: '1 1 250px', minWidth: '250px', maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button 
            onClick={() => setActiveTab('profile')}
            style={{ padding: '1rem', textAlign: 'left', background: activeTab === 'profile' ? 'var(--color-gold-dark)' : 'white', color: activeTab === 'profile' ? 'white' : '#333', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.8rem', fontWeight: activeTab === 'profile' ? 'bold' : 'normal' }}
          >
            <User size={18} /> Admin Profile
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            style={{ padding: '1rem', textAlign: 'left', background: activeTab === 'security' ? 'var(--color-gold-dark)' : 'white', color: activeTab === 'security' ? 'white' : '#333', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.8rem', fontWeight: activeTab === 'security' ? 'bold' : 'normal' }}
          >
            <Lock size={18} /> Security & Password
          </button>
          <button 
            onClick={() => setActiveTab('team')}
            style={{ padding: '1rem', textAlign: 'left', background: activeTab === 'team' ? 'var(--color-gold-dark)' : 'white', color: activeTab === 'team' ? 'white' : '#333', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.8rem', fontWeight: activeTab === 'team' ? 'bold' : 'normal' }}
          >
            <ShieldCheck size={18} /> Team Management
          </button>
        </div>

        {/* Content Area */}
        <div style={{ flex: '3 1 300px', minWidth: '300px', background: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', overflowX: 'auto' }}>
          
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <div>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>Admin Identity</h2>
              
              <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#f5f5f5', overflow: 'hidden', border: '2px dashed #ddd', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                      <User size={40} />
                    </div>
                  </div>
                  <label style={{ cursor: 'pointer', background: '#111', color: 'white', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Upload size={14} /> Upload ID Image
                    <input type="file" hidden accept="image/*" />
                  </label>
                </div>
                
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Full Name</label>
                    <input type="text" defaultValue="Sriyansh Nahar" style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '6px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Email Address</label>
                    <input type="email" defaultValue="admin@diamond.com" style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '6px' }} />
                  </div>
                  <button className="btn-primary" style={{ padding: '0.8rem 2rem', alignSelf: 'flex-start', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <Save size={18} /> Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>Change Password</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '500px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Current Password</label>
                  <input type="password" value={passwords.current} onChange={e => setPasswords({...passwords, current: e.target.value})} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '6px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>New Password</label>
                  <input type="password" value={passwords.new} onChange={e => setPasswords({...passwords, new: e.target.value})} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '6px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Confirm New Password</label>
                  <input type="password" value={passwords.confirm} onChange={e => setPasswords({...passwords, confirm: e.target.value})} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '6px' }} />
                </div>
                <button className="btn-primary" style={{ padding: '0.8rem 2rem', alignSelf: 'flex-start', display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '1rem' }}>
                  <Lock size={18} /> Update Password
                </button>
              </div>
            </div>
          )}

          {/* Team Management */}
          {activeTab === 'team' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.4rem' }}>Team Members</h2>
                <button className="btn-primary" style={{ padding: '0.6rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <Plus size={16} /> Add Member
                </button>
              </div>
              
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f5f5f5', textAlign: 'left' }}>
                    <th style={{ padding: '1rem' }}>Name</th>
                    <th style={{ padding: '1rem' }}>Email</th>
                    <th style={{ padding: '1rem' }}>Role</th>
                    <th style={{ padding: '1rem' }}>Status</th>
                    <th style={{ padding: '1rem' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {team.map(member => (
                    <tr key={member.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '1rem', fontWeight: 'bold' }}>{member.name}</td>
                      <td style={{ padding: '1rem', color: '#666' }}>{member.email}</td>
                      <td style={{ padding: '1rem' }}><span style={{ background: '#eef2ff', color: '#4f46e5', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem' }}>{member.role}</span></td>
                      <td style={{ padding: '1rem' }}><span style={{ color: '#16a34a', fontSize: '0.9rem' }}>● {member.status}</span></td>
                      <td style={{ padding: '1rem' }}>
                        <button onClick={() => setTeam(team.filter(t => t.id !== member.id))} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
