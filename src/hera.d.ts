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

declare namespace Mailer {
    interface SendOptions {
        readonly recipient: string;
        readonly subject: string;
        readonly message: string;
        readonly password: string;
    }
    interface ConstructorOptions {
        readonly from: string;
        readonly to: string;
        readonly subject: string;
        readonly text: string;
        readonly html: string;
    }
}

declare namespace LyricsConstructor {
    abstract class Ly {
        protected static WhiteSpace: Function;
        protected static Spacer: Function;
        public abstract SongLyrics(Opts: LyricsConstructor.LyricsProps): any;
        protected abstract Suggestions(url: string): void;
    }
    interface LyricsProps {
        title: string
        artist: string;
    }
}

interface Questions {
    readonly type: string;
    readonly name: string;
    readonly message: string;
    readonly mask?: string;
    readonly default?: boolean;
    validate?: (value: string) => string | boolean;
}
