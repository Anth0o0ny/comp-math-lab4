package com.anth0o0ny;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.anth0o0ny.data.PointsModel;
import com.anth0o0ny.ApproxService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@org.springframework.stereotype.Controller
public class Controller {

    private ApproxService service;

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @PostMapping("points/solve")
    @ResponseBody
    public ObjectNode solve(@RequestBody PointsModel points) {
        service = new ApproxService(points);

        return service.processData();
    }

}
