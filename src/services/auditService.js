import { createRecord } from './portfolioService';

export const logAdminAction = async (actionType, details, userEmail) => {
  try {
    const logData = {
      action: actionType,
      details,
      timestamp: new Date().toISOString(),
      performedBy: userEmail || 'unknown'
    };
    
    // We can write to a dedicated 'audit_logs' collection in Firestore
    await createRecord('auditLogs', logData);
  } catch (error) {
    // Fail silently on audit logging to avoid breaking core application workflows
    console.error('Audit logging failed:', error.message);
  }
};
