package com.tairun.dao;

import com.tairun.model.LsPassport;

public interface LsPassportMapper {
    int deleteByPrimaryKey(Integer passPortId);

    int insert(LsPassport record);

    int insertSelective(LsPassport record);

    LsPassport selectByPrimaryKey(Integer passPortId);

    int updateByPrimaryKeySelective(LsPassport record);

    int updateByPrimaryKey(LsPassport record);
}