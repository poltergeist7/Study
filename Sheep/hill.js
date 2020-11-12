//움직이는 웨이브 만들
export class Hill {
    //색상과 속도와 언덕에 포인트 개수를 파라미터로 받아오도록 함수 지
    constructor(color, speed, total) {
        this.color = color;
        this.speed = speed;
        this.total = total;
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        //스테이지 사이즈를 파라미터로 받아오고
        this.points = [];
        // 각 좌표의 x값은 토탈 포인트 개수만큼 띄우도록 하는데
        // 포인트 갯수를 토탈에 맞추지 않고 좀 더 넓은 간격을 정의해서 스테이지보다 크게 그려지도록 정의
        // 그래야 양이 걸어올때 화면밖에서 자연스럽게 걸어오는 양을 만들 수 있음
        this.gap = Math.ceil(this.stageWidth / (this.total - 2));

        //포인트 배열을 생성해서 포인트를 저장
        for (let  i = 0; i < this.total; i++) {
            this.points[i] = {
                x: i * this.gap,
                //좌표의 y값은 getY()함수를 사용해서 램덤으로 정의
                y: this.getY()
            };
        }
    }

    // draw 함수에 그림을 그림
    draw(ctx) {
        ctx.fillStage = this.color;
        ctx.beginPath();

        let cur = this.points[0];
        let prev = cur;

        let dots = [];

        ctx.moveTo(cur.x, cur.y);

        let prevCx = cur.x;
        let prevCy = cur.y;

        for (let i = 1; i < this.points.length; i++) {
            cur = this.points[i];

            // 포인트 배열을 가져와서 quadraticCurveTo 함수로 곡선을 그림
            const cx = (prev.x + prev.y) / 2;
            const cy = (prev.y + prev.x) / 2;
            ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);

            // 양이 곡선의 좌표를 양의 좌표를 찾는데 써야 하므로 위에 dots라는 배열에 저장을 함
            dots.push({
                x1: prevCx,
                y1: prevCy,
                x2: prev.x,
                y2: prev.y,
                x3: cx,
                y3: cy,
            });

            prev = cur;
            prevCx = cx;
            prevCy = cy;
        }

        ctx.lineTo(prev.x, prev.y);
        ctx.lineTo(this.stageWidth, this.stageHeight);
        ctx.lineTo(this.points[0].x, this.stageHeight);
        ctx.fill();

        // dots.push() 를 리턴해줌
        return dots;
    }

    getY() {
        // 스테이지 높이를 8정도로 나눈 값을 기준으 랜덤하게 높이를 리턴하는 함수를 만
        const min = this.stageHeight / 8;
        const max = this.stageHeight - min;
        return min + Math.random() * max;
    }
}
