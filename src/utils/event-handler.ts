/* eslint-disable @typescript-eslint/no-unused-vars */

/**
* Small utility class that creates an `AuditEvent` type, allowing you to use
* `logger.event(<AuditEvent>)`.
*
* This is implemented in `src/config/logger.ts`. Feel free to customize or
* remove it if it does not fit your needs.
*
* The event types and the data displayed in each event are entirely up to you.
* In my case, I added the ones I considered most useful.
*
* EXAMPLE USAGE:
*
* const myEvent = new AuditEvent({
*   projectId: 'core-api',
*   event: 'delete_account',
*   environment: 'production',
* });
*
* logger.event(myEvent);
*
* OUTPUT:
*
* [23:54:37] INFO: [auth-service] [production] delete_account
* {
*   "event": "delete_account",
*   "projectId": "core-api",
*   "unixTime": 1779494077
* }
*/

const TYPE_EVENTS = [
    'create_account',
    'delete_account',
] as const;

type EventType = (typeof TYPE_EVENTS)[number];

interface AuditEventProps {
    event: EventType;
    projectId: string;
    unixTime?: number;
    more?: string[];
    service?: string;
    environment?: 'development' | 'production';
}

class AuditEvent {
    readonly event: EventType;
    readonly projectId: string;
    readonly unixTime: number;
    readonly more?: string[]; // `more` do reference to more types of data to share

    readonly service: string;
    readonly environment: string;

    constructor(props: AuditEventProps) {
        this.event = props.event;
        this.projectId = props.projectId;

        this.unixTime =
            props.unixTime ??
            Math.floor(Date.now() / 1000);

        this.more = props.more;

        this.service =
            props.service ?? 'auth-service'; // change the value default;

        this.environment =
            props.environment ?? 'development';
    }

    toJSON() {
        return {
            event: this.event,
            projectId: this.projectId,
            unixTime: this.unixTime,
            more: this.more,
        };
    }
}

export { AuditEvent };