function wait(waitTime: number = 1): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, waitTime));
}

export default wait;
