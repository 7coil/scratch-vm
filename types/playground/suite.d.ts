declare function soon(): any;
declare class Emitter {
    on(name: any, listener: any, context: any): void;
    off(name: any, listener: any, context: any): void;
    emit(name: any, ...args: any[]): void;
}
declare class BenchFrameStream extends Emitter {
    constructor(frame: any);
    frame: any;
    send(message: any): void;
}
declare function benchmarkUrlArgs(args: any): string;
declare namespace BENCH_MESSAGE_TYPE {
    const INACTIVE: string;
    const LOAD: string;
    const LOADING: string;
    const WARMING_UP: string;
    const ACTIVE: string;
    const COMPLETE: string;
}
declare class BenchUtil {
    constructor(frame: any);
    frame: any;
    benchStream: BenchFrameStream;
    setFrameLocation(url: any): void;
    startBench(args: any): void;
    benchArgs: any;
    pauseBench(): void;
    resumeBench(): void;
    renderResults(results: any): void;
}
declare namespace BENCH_STATUS {
    const INACTIVE_1: string;
    export { INACTIVE_1 as INACTIVE };
    export const RESUME: string;
    export const STARTING: string;
    const LOADING_1: string;
    export { LOADING_1 as LOADING };
    const WARMING_UP_1: string;
    export { WARMING_UP_1 as WARMING_UP };
    const ACTIVE_1: string;
    export { ACTIVE_1 as ACTIVE };
    const COMPLETE_1: string;
    export { COMPLETE_1 as COMPLETE };
}
declare class BenchResult {
    constructor({ fixture, status, frames, opcodes }: {
        fixture: any;
        status?: string;
        frames?: any;
        opcodes?: any;
    });
    fixture: any;
    status: string;
    frames: any;
    opcodes: any;
}
declare class BenchFixture extends Emitter {
    constructor({ projectId, warmUpTime, recordingTime }: {
        projectId: any;
        warmUpTime?: number;
        recordingTime?: number;
    });
    projectId: any;
    warmUpTime: number;
    recordingTime: number;
    get id(): string;
    run(util: any): Promise<any>;
}
declare class BenchSuiteResult extends Emitter {
    constructor({ suite, results }: {
        suite: any;
        results?: any[];
    });
    suite: any;
    results: any[];
}
declare class BenchSuite extends Emitter {
    constructor(fixtures?: any[]);
    fixtures: any[];
    add(fixture: any): void;
    run(util: any): Promise<any>;
}
declare class BenchRunner extends Emitter {
    constructor({ frame, suite }: {
        frame: any;
        suite: any;
    });
    frame: any;
    suite: any;
    util: BenchUtil;
    run(): any;
}
declare const viewNames: {
    [x: string]: string;
};
declare class BenchResultView {
    constructor({ result, benchUtil }: {
        result: any;
        benchUtil: any;
    });
    result: any;
    compare: any;
    benchUtil: any;
    dom: HTMLDivElement;
    update(result: any): void;
    resume(): void;
    setFrameLocation(loc: any): void;
    act(ev: any): void;
    render(newResult?: any, compareResult?: any): BenchResultView;
}
declare class BenchSuiteResultView {
    constructor({ runner }: {
        runner: any;
    });
    runner: any;
    suite: any;
    views: {};
    dom: HTMLDivElement;
    render(): BenchSuiteResultView;
}
declare let suite: any;
declare let suiteView: any;
