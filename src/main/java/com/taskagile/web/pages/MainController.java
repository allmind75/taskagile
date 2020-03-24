package com.taskagile.web.pages;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * JavaDoc용 클래스의 용도를 설명합니다
 *
 * @author 서비스INFRA팀 TA파트 장환호
 * @version 1.0
 * <pre>
 * 2020.03.23 : 최초 작성
 * </pre>
 * @since 2020-03-23
 */
@Controller
public class MainController {

    @GetMapping(value = { "/", "/login" })
    public String entry() {
        return "index";
    }

}
