package com.tairun.filter;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.tairun.utils.Constants;
import com.tairun.utils.PropertiesUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;


/**
 * Created by lyc on 2017/8/28.
 * 访问每个页面 授权 过滤拿到openid
 */
public class WeiXinFilter implements javax.servlet.Filter {

    public static int i = 0;
    public void init(FilterConfig filterConfig) throws ServletException {
        //初始化操作
    }

    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;
        String openId = (String) request.getSession().getAttribute("openid");
        String url1 = request.getRequestURI();
        //静态资源
        if(url1.indexOf(".") != -1){
            String staticUrl = url1.substring(url1.lastIndexOf("."));
            System.out.println(staticUrl);
            if(staticUrl.equals(".css") || staticUrl.equals(".js") || staticUrl.equals(".ttf") || staticUrl.equals(".jpg")||staticUrl.equals(".png")){
                chain.doFilter(request,response);
                return;
            }
        }

        //授权已经拿到openid但是 用户没有绑定
        if(!StringUtils.isNotBlank(openId)){
            if (!isExits(openId,request)) {
                request.getRequestDispatcher("/WEB-INF/jsp/phone_amend.jsp").forward(request, response);
                return;
            }
        }

        //如果openid 不存在
        if (openId == null) {
            String agent = request.getHeader("User-Agent");
            if (agent != null && agent.toLowerCase().indexOf("micromessenger") >= 0) {
                String code = request.getParameter("code");
                String state = request.getParameter("state");
                if (code != null && state != null && state.equals("1")) {
                    //通过Code获取openid来进行授权
                    String url = Constants.OAUTH2;
                    url = url.replace("APPID", Constants.APPID)
                            .replace("CODE", code)
                            .replace("SECRET", Constants.SECRET);
                    RestTemplate restTemplate = new RestTemplate();
                    System.out.println(url);
                    ResponseEntity<String> result = restTemplate.getForEntity(url, String.class);

                    String body = result.getBody();
                    JSONObject jsonObject = (JSONObject) JSON.parse(body);
                    String accessToken = jsonObject.get("access_token").toString();
                    String openid = jsonObject.get("openid").toString();
                    request.getSession().setAttribute("openid", openid);
                    //根据openid 去接口 查询 1.如果有保存 直接过 2.没有 跳转 手机绑定数据
                    if (!isExits(openid,request)) {
                        request.getRequestDispatcher("/WEB-INF/jsp/phone_amend.jsp").forward(request, response);
                        return;
                    }

                } else {//去授权
                    String path = request.getRequestURL().toString();
                    String query = request.getQueryString();
                    String uri = Constants.OAUTH2ADDR;
                    uri = uri.replace("APPID", Constants.APPID)
                            .replace("REDIRECT_URI", URLEncoder.encode(path, "UTF-8"))
                            .replace("STATE", "1");
                    response.sendRedirect(uri);
                    return;
                }
            }

        }
        chain.doFilter(request, response);
    }

    /**
     * 是否已经注册
     * 这里是外包 的接口信息 查询是否绑定数据
     * @param openid
     * @return
     */
    private boolean isExits(String openid,HttpServletRequest request){
        RestTemplate restTemplate = new RestTemplate();
        String login = PropertiesUtil.getPropsAsString("login");
        MultiValueMap<String, String> form = new LinkedMultiValueMap<String, String>();
        form.add("openId", openid);
        form.add("type", "weixin");
        String r = restTemplate.postForObject(login, form, String.class);
        System.out.println(r);
        JSONObject json = (JSONObject) JSON.parse(r);
        if(json.get("status").toString().equals("-2") || json.get("status").toString().equals("0")){
            return  false;
        }
        return true;
    }


    public void destroy() {

    }
}
