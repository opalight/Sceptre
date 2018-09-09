declare namespace TaskDefinition {
    interface TasksConstructor {
        newTask(): Promise<any>
    }
    interface New {
        _id: string;
        title: string;
        body: string;
        lastModified: string;
        completed?: boolean
    }
    interface Task {
        title: string;
        body: string;
        id?: string
    }
    interface Update {
        title: string;
        body: string;
        lastModified?: string
    }
}

declare namespace Mailer.Options {
    interface Send {
        readonly recipient: string;
        readonly subject: string;
        readonly message: string;
        readonly password: string;
    }
    interface Constructor {
        readonly from: string;
        readonly to: string;
        readonly subject: string;
        readonly text: string;
        readonly html: string;
    }
}

declare namespace LyricsOptions {
    interface Props {
        title: string
        artist: string;
    }
}

declare interface Questions {
    readonly type: string;
    readonly name: string;
    readonly message: string;
    readonly mask?: string;
    readonly default?: boolean;
    validate?: (value: string) => string | boolean;
}
declare namespace Runner {
    interface Options {
        lyrics(song: any): void;
        mail(): void;
        tasks(command: string): void;
    }
}