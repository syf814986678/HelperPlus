package com.shiyifan.config;



import com.shiyifan.OrderService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.ArrayList;


/**
 * @author ZouCha
 * @name ScheduleTaskConfig
 * @date 2020-11-20 14:57:12
 **/
@Configuration
@EnableScheduling
@Log4j2
public class ScheduleTaskConfig {

    @Autowired
    private OrderService orderService;

    @Scheduled(cron = "0 0/1 * * * ? ")
    private void checkOrder(){
        try {
            ArrayList<String> strings = orderService.selectUnCheckOrders();
            if(strings.size() <= 0){
                log.info("暂无需要审核订单");
                return;
            }
            orderService.checkOrder(strings);
            log.info("审核成功");
        }
        catch (Exception e){
            log.error("审核失败");
            log.error(e);
        }

    }


}
