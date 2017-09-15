package com.tairun.model;

import java.util.Date;

public class LsPassport {
    private Integer passPortId;

    private String userId;

    private String type;

    private String nickName;

    private String openId;

    private String accessToken;

    private String props;

    private Date createTime;

    private Date lastLoginTime;

    private String bindingUserId;

    private String currentUserId;

    public Integer getPassPortId() {
        return passPortId;
    }

    public void setPassPortId(Integer passPortId) {
        this.passPortId = passPortId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId == null ? null : userId.trim();
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type == null ? null : type.trim();
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName == null ? null : nickName.trim();
    }

    public String getOpenId() {
        return openId;
    }

    public void setOpenId(String openId) {
        this.openId = openId == null ? null : openId.trim();
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken == null ? null : accessToken.trim();
    }

    public String getProps() {
        return props;
    }

    public void setProps(String props) {
        this.props = props == null ? null : props.trim();
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getLastLoginTime() {
        return lastLoginTime;
    }

    public void setLastLoginTime(Date lastLoginTime) {
        this.lastLoginTime = lastLoginTime;
    }

    public String getBindingUserId() {
        return bindingUserId;
    }

    public void setBindingUserId(String bindingUserId) {
        this.bindingUserId = bindingUserId == null ? null : bindingUserId.trim();
    }

    public String getCurrentUserId() {
        return currentUserId;
    }

    public void setCurrentUserId(String currentUserId) {
        this.currentUserId = currentUserId == null ? null : currentUserId.trim();
    }
}