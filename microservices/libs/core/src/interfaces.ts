import { Inbox } from '@app/inbox';

interface TargetRepository {
  process(message: Inbox): Promise<void>;
}

export { TargetRepository };
