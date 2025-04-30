enum EVENTS {
  WORKFLOW_CREATE = 'workflows.create',
  ALARM_CREATE = 'alarm.created',
  ALARM_CLASSIFY = 'alarm.classify',
  NOTIFICATION_SEND = 'notification.send',
}

const MESSAGE_BROKER = Symbol('message-broker');
const TARGET_REPOSITORY = Symbol('target-repository');

enum MESSAGE_STATUS {
  PENDING = 'pending',
  PROCESSED = 'processed',
}

export { EVENTS, MESSAGE_BROKER, TARGET_REPOSITORY, MESSAGE_STATUS };
