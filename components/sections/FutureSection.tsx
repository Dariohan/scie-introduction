import { WorldConnection } from "@/components/WorldConnection";
import { SmartImage } from "@/components/ui/SmartImage";

export function FutureSection() {
  return (
    <section id="future" className="future-section">
      <div className="future-intro section-shell">
        <span className="future-intro__number">05</span>
        <div>
          <span className="kicker">未来寄语</span>
          <h2>
            我们选择在有海的深圳读书。
            <br />
            从这里走出去，世界很大。
          </h2>
          <p>认识它，理解它，然后用自己的方式改变它。</p>
        </div>
      </div>

      <WorldConnection />

      <footer className="site-footer">
        <div className="site-footer__brand">
          <SmartImage src="/media/scie-emblem.svg" alt="深圳国际交流书院校徽" />
          <div>
            <strong>深圳国际交流书院</strong>
            <span>立足深圳 · 连接世界</span>
          </div>
        </div>
        <div className="site-footer__meta">
          <p>广东省深圳市福田区安托山六路3号</p>
          <p>
            世界地图素材：阿尔·麦克唐纳、弗里茨·莱克沙斯，按
            <a
              href="https://creativecommons.org/licenses/by-sa/3.0/deed.zh-hans"
              target="_blank"
              rel="noreferrer"
            >
              “知识共享 署名—相同方式共享 3.0”
            </a>
            许可使用。
          </p>
          <p>
            页面数据优先采用学校、深圳市教育主管部门、剑桥国际及建筑设计授权项目资料；校园生活内容由素材影像提炼。校园平面图与课表示例采用本次提供素材，叙事性一日日程不代表固定作息。
          </p>
        </div>
      </footer>
    </section>
  );
}
