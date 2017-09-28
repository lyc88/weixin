import java.util.Collections;

/**
 * Created by THINK on 2017/9/15.
 */
public class InterruptTest {
    public static void main(String[] args) {

        Thread t = new Thread() {
            public void run() {
                try {
                    System.out.println("我被执行了-在sleep()方法前");
// 停止运行10分钟
                    Thread.sleep(1000 * 60 * 10);
                    System.out.println("我被执行了-在sleep()方法后");
                } catch (InterruptedException e) {
                    System.out.println("我被执行了-在catch语句块中");
                }
                System.out.println("我被执行了-在try{}语句块后");
            }
        };
// 启动线程
        t.start();
// 在sleep()结束前中断它
        t.interrupt();
    }
}
