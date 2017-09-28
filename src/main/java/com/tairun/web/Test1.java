package com.tairun.web;

import java.util.StringTokenizer;

/**
 * Created by THINK on 2017/9/20.
 */
public class Test1 extends Test{

    @Override
    public int getI() {

        return 2;

    }
    private void hello(){
        System.out.println("hello---");
    }

    public static void main(String[] args) {
        Test1 t = new Test1();
        String orgStr = "a,b,c";
        String sa;
        StringTokenizer tokener = new StringTokenizer(orgStr,",");

        String [] result =new String[tokener.countTokens()];
        int i =0;
        while(tokener.hasMoreTokens()){result[i++]=tokener.nextToken();}

       for (String s : result){
           System.out.println(s);
       }
        System.out.println(t.getI() );
        t.hello();
    }
}
