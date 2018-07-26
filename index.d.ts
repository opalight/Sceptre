///// <reference path="hera.d.ts" />
export declare class Hera {
    Shrug(): void;
    Quad(a: number, b: number, c: number): void;
    Mail(Params: Mailer.Options.Send): void;
    Lyrics(song: string, artist: string): void;
    Tasks(): Tasks;
}

export declare class Mail {
    protected sender: string;
    constructor(Sender?: string);
    Send(mail: Mailer.Options.Send): void;
}

export declare class Lyrics {
    protected WhiteSpace(str: string): string;
    protected Spacer(str: string): string | any;
    SongLyrics(Song: LyricsOptions.Props): any;
    protected Suggestions(url: string): void;
}

export declare class Tasks {
    newTask(Task: TaskDefinition.Task): Promise<string | void>;
    updateTask(Task: TaskDefinition.Task): Promise<string | void>;
    showAllTask(): Promise<void>;
    deleteTask(taskId: string): Promise<any>;
    deleteAllTask(): Promise<void>;
}

export declare const shrug: () => void;
export declare function quadratic(a: number, b: number, c: number): void;
