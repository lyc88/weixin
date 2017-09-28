package com.lyc.thread;

/**
 * Created by THINK on 2017/9/15.
 */
public abstract class Task {

    public enum State {
        /* 新建 */NEW, /* 执行中 */RUNNING, /* 已完成 */FINISHED
    }

    // 任务状态
    private State state = State.NEW;
    public void setState(State state) {
        this.state = state;
    }
    public State getState() {
        return state;
    }
    public abstract void deal();
}
