package com.anth0o0ny.computation;

import com.anth0o0ny.data.PointsModel;

import java.util.Arrays;

public class LogarithmicApproximation extends Approximation {

    public LogarithmicApproximation(PointsModel points) {
        super(points);
    }

    final int N = x.length;
    @Override
    public void computeCoefficients() {
        computeB();
        computeA();
    }

    @Override
    protected void computeA() {
        a = (sy() - b * slnx()) / N;
    }

    @Override
    protected void computeB() {
        b = (N * sxy() - sx() * sy()) / (N * sxx() - sx() * sx());
    }

    @Override
    public void computePhy() {
        for (int i = 0; i < N; i++) {
            phy[i] = a + b * Math.log(x[i]);
            if (Double.isInfinite(phy[i]) || Double.isNaN(phy[i])) {
                phy[i] = 0;
            }
        }
    }

    private double slnx() {
        return Arrays.stream(x)
                .filter(x -> x > 0)
                .map(Math::log)
                .sum();
    }

    @Override
    public String toString() {
        return "LogApproximation";
    }
}
