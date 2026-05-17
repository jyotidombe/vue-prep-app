export function throttle<T extends (...args:any[]) => void> (
	func:T, 
	delay: number
	): (...args:Parameters<T>) => void {
    
    let lastExecutionTime: 0 | number = 0;
    return function(...args:Parameters<T>){
        const now = Date.now();
        if(now - lastExecutionTime >= delay){
            func(args);
        }
        lastExecutionTime = Date.now();
    }
}