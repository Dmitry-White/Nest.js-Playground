enum EVENTS {
  WORKFLOW_CREATE = 'workflows.create',
  ALARM_CREATE = 'alarm.created',
  ALARM_CLASSIFY = 'alarm.classify',
  NOTIFICATION_SEND = 'notification.send',
}

const MESSAGE_BROKER = Symbol('message-broker');

export { EVENTS, MESSAGE_BROKER };
