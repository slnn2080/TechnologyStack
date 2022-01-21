<template>
  <div>
    <Heading heading="お役立ちツール" />
    <div class="l-cnt__main">
      <section class="m-section__inner p-tool__section">
        <h2 class="m-hdg__01 p-tool__hdg">販売店の皆様へ</h2>
        <h3 class="p-tool__hdg p-tool__hdg--sub">
          いつもKINTOをご提案いただきありがとうございます。<br>このページには商談に役立つ各種素材や、事務取扱い要領を掲載しております。<br>対象のツールを印刷の上、ご活用下さい。代替えご検討のお客様には「維持費・乗換比較表」を作成しご提示ください！<br>KINTO専用 「モリゾウセレクション」・「KINTOツーリングセレクション」パンフレットも本ページに掲載しておりますので印刷の上、商談にご活用ください。
        </h3>
      </section>
    </div>
    <div class="l-cnt__main">
      <section class="m-section__inner p-tool__section">
        <div class="p-tool__hdg__area">
          <h2 class="m-hdg__01 p-tool__hdg">販売店の皆様へ</h2>
          <h3 class="p-tool__hdg p-tool__hdg--sub">いつもKINTOをご提案いただきありがとうございます。<br />このページには商談に役立つ各種素材や、事務取扱い要領を掲載しております。<br />対象のツールを印刷の上、ご活用下さい。代替えご検討のお客様には「維持費・乗換比較表」を作成しご提示ください！<br />KINTO専用 「モリゾウセレクション」・「KINTOツーリングセレクション」パンフレットも本ページに掲載しておりますので印刷の上、商談にご活用ください。</h3>
          <h3 class="m-hdg__03 u-clr--caution">※ご注意ください※</h3>
          <p class="m-txt__normal u-clr--caution">KINTO商談サイト（販売店用）から一般向けWEBサイトにページ遷移した場合、商談サイトに戻れない場合があります。<br />その場合は、SAポータルメニューから再度KINTO商談サイト（販売店用）にお入りください。</p>
        </div>
      </section>
      <section class="m-section__inner">
        <ul class="m-tab-menu">
          <li class="m-tab-menu__item"><span class="m-tab-trigger js-tab-trigger is-active" data-id="tab01">TOYOTA</span></li>
          <li class="m-tab-menu__item"><span class="m-tab-trigger js-tab-trigger" data-id="tab02">LEXUS</span></li>
        </ul>
        <!-- .tab-menu-->
        <div class="m-tab-content">
          <div class="m-tab-content__item js-tab-target is-active" id="tab01">
            <h2 class="m-hdg__02">TOYOTA商談ツール</h2>
            <div class="m-clm__cnt">
              <div class="m-clm__child m-clm__child--02 p-tool__grid">
                <h2 class="m-hdg__02">商談ツール</h2>
                <ul class="m-list__normal p-tool__list">
                  <li v-for="(list,i) in opportunity"><a href="`/assets/file/toyota/${list.file}.${list.filetype}`">{{list.name}}</a></li>
                </ul><span class="m-txt__normal u-clr--caution">ガイドブックをご要望の場合は本部にお問い合わせください
                  <li>ご案内用チラシ
                    <ul class="m-list__normal in-list">
                      <li><a href="/assets/file/toyota/toyota_all_presen.pdf" target="_blank" rel="noopener noreferrer">全年齢向け提案書</a></li>
                      <li><a href="/assets/file/toyota/toyota_newage_presen.pdf" target="_blank" rel="noopener noreferrer">若年層向け提案書</a></li>
                      <li><a href="/assets/file/toyota/toyota_senior_presen.pdf" target="_blank" rel="noopener noreferrer">シニア向け提案書</a></li>
                      <li><a href="/assets/file/toyota/toyota_new_presen.pdf" target="_blank" rel="noopener noreferrer">新規・増車向け提案書</a></li>
                      <li><a href="/assets/file/toyota/toyota_corp_presen.pdf" target="_blank" rel="noopener noreferrer">法人向け提案書</a></li>
                      <li><a href="/assets/file/toyota/toyota_to_presen.pdf" target="_blank" rel="noopener noreferrer">海外赴任向け提案書</a></li>
                      <li><a href="/assets/file/toyota/turn_tilt_seat_DH.pdf" target="_blank" rel="noopener noreferrer">ターンチルトシート提案書</a></li>
                      <li><a href="/assets/file/toyota/turn_tilt_seat_manga.pdf" target="_blank" rel="noopener noreferrer">ターンチルトシート利用シーン訴求マンガ</a></li>
                    </ul>
                  </li>
                  <li>KINTOサービス案内動画
                    <ul class="m-list__normal in-list">
                      <li><a href="https://youtu.be/bOCdBa6Nu94" target="_blank" rel="noopener noreferrer">【概要編】</a></li>
                      <li><a href="https://youtu.be/sgzSSD6YQes" target="_blank" rel="noopener noreferrer">【詳細編】</a></li>
                      <li><a href="https://youtu.be/B0_clLdW4tk" target="_blank" rel="noopener noreferrer">【法人編】</a></li>
                    </ul>
                  </li>
                  <li>スタッフ向け理解促進動画
                    <ul class="m-list__normal in-list">
                      <li><a href="https://youtu.be/TJnaCtscp6c" target="_blank" rel="noopener noreferrer">KINTO ONE商品解説動画</a></li>
                    </ul>
                  </li>
                  <li><a href="/assets/file/toyota/t_assistbook.pdf" target="_blank" rel="noopener noreferrer">KINTO ONEセールスアシストブック</a></li>
                  <li><a href="/assets/file/common/tebiki.pdf" target="_blank" rel="noopener noreferrer">KINTO勉強法の手引き</a></li>
                  <li><a href="/assets/file/common/talkscript.pdf" target="_blank" rel="noopener noreferrer">トークスクリプト</a></li>
                  <li><a href="/assets/file/common/kinto_keiyakugamenn.pdf" target="_blank" rel="noopener noreferrer">KINTO契約画面遷移資料</a></li>
                </span>
              </div>
              <div class="m-clm__child m-clm__child--02 p-tool__grid">
                <h2 class="m-hdg__02">お役立ちWEBサイト</h2>
                <ul class="m-list__normal p-tool__list">
                  <li><a href="https://kinto-jp.com/customer/dealer-kinto_one-contract-redirect?dlrflg=true" target="_blank" rel="noopener noreferrer">ご利用手順</a></li>
                  <li><a href="https://kinto-jp.com/customer/dealer-kinto_one-payment_simulation-redirect?dlrflg=true" target="_blank" rel="noopener noreferrer">KINTO料金比較ツール</a></li>
                  <li><a href="https://kinto-jp.com/customer/dealer-buy_estimate-redirect?dlrflg=true" target="_blank" rel="noopener noreferrer">買替えシミュレーション</a></li>
                </ul>
              </div>
              <div class="m-clm__child m-clm__child--02 p-tool__grid">
                <h2 class="m-hdg__02">マニュアル類</h2>
                <ul class="m-list__normal p-tool__list">
                  <li><a href="/assets/file/toyota/t_carchange.pdf" target="_blank" rel="noopener noreferrer">車種切替スケジュール</a></li>
                  <li><a href="/assets/file/toyota/t_product_docs.pdf" target="_blank" rel="noopener noreferrer">商品概要</a></li>
                  <li><a href="/assets/file/toyota/t_docs.pdf" target="_blank" rel="noopener noreferrer">各種手続きの流れ</a></li>
                  <li><a href="/assets/file/toyota/t_web_pal_doc.pdf" target="_blank" rel="noopener noreferrer">WEB入力手順・PAL入力方法</a></li>
                </ul>
                <ul class="m-list__normal p-tool__list">
                  <li><a href="/assets/file/toyota/t_store_docs.pdf" target="_blank" rel="noopener noreferrer">【暫定対応】各種手続きの流れ</a><br /><span class="m-txt__normal u-clr--caution">解約金フリープランが商談サイトに実装されるまでの暫定対応資料となります</span></li>
                  <li><a href="/assets/file/toyota/tentou_maruwakari.pdf" target="_blank" rel="noopener noreferrer">【店頭商流】受注の流れまるわかりガイド</a></li>
                  <li><a href="/assets/file/toyota/web_maruwakari.pdf" target="_blank" rel="noopener noreferrer">【Web商流】受注の流れまるわかりガイド</a></li>
                  <li><a href="/assets/file/toyota/norikae_maruwakari.pdf" target="_blank" rel="noopener noreferrer">【店頭商流】のりかえGOまるわかりガイド</a></li>
                </ul>
              </div>
              <div class="m-clm__child m-clm__child--02 p-tool__grid">
                <h2 class="m-hdg__02">モリゾウセレクション　商談ツール<br /><span>GRヤリス "モリゾウセレクション"</span></h2>
                <ul class="m-list__normal p-tool__list">
                  <li><a href="/assets/file/toyota/t_morizo_a4.pdf" target="_blank" rel="noopener noreferrer">簡易カタログ</a></li>
                  <li><a href="/assets/file/toyota/t_morizo_a4_separate.pdf" target="_blank" rel="noopener noreferrer">簡易カタログ(A4分割版)</a><br /><span class="m-txt__normal u-clr--caution">紙のパンフレットをご要望の場合には本部にお問い合わせください</span></li>
                </ul>
                <ul class="m-list__normal p-tool__list">
                  <li><a href="/assets/file/toyota/t_morizo_flyer.pdf" target="_blank" rel="noopener noreferrer">店頭商談用DH(モリゾウセレクションのみ)</a></li>
                  <li><a href="/assets/file/toyota/t_morizo_flyer_02.pdf" target="_blank" rel="noopener noreferrer">店頭商談用DH(モリゾウセレクション、GR86)</a></li>
                </ul>
              </div>
              <div class="m-clm__child m-clm__child--02 p-tool__grid">
                <h2 class="m-hdg__02">KINTOツーリングセレクションパンフレット</h2>
                <ul class="m-list__normal p-tool__list">
                  <li><a href="/assets/file/toyota/t_ktsyaris.pdf" target="_blank" rel="noopener noreferrer">ヤリス(KINTOツーリングセレクション)</a></li>
                </ul>
              </div>
              <div class="m-clm__child m-clm__child--02 p-tool__grid">
                <h2 class="m-hdg__02">モビリティマーケット</h2>
                <ul class="m-list__normal p-tool__list">
                  <li><a href="/assets/file/common/mobility_market_pamphlet.pdf" target="_blank" rel="noopener noreferrer">パンフレット</a></li>
                </ul>
              </div>
            </div>
          </div>
          <!-- .tab-content__item-->
          <div class="m-tab-content__item js-tab-target" id="tab02">
            <h2 class="m-hdg__02">LEXUS商談ツール</h2>
            <div class="m-clm__cnt">
              <div class="m-clm__child m-clm__child--02 p-tool__grid">
                <h2 class="m-hdg__02">商談ツール</h2>
                <ul class="m-list__normal p-tool__list">
                  <li><a href="/assets/file/lexus/lexus_normal_presen.pdf" target="_blank" rel="noopener noreferrer">KINTOお勧め車種一覧</a></li>
                  <li><a href="/assets/file/common/comparison.xlsx" target="_blank" rel="noopener noreferrer">維持費・乗換費用比較表</a></li>
                  <li><a href="/assets/file/lexus/lexus_guidebook.pdf" target="_blank" rel="noopener noreferrer">KINTO for LEXUS ガイドブック</a><br /><span class="m-txt__correction">ガイドブックをご要望の場合は本部にお問い合わせください</span></li>
                  <li>ご案内用チラシ
                    <ul class="m-list__normal in-list">
                      <li><a href="/assets/file/lexus/lexus_all_presen.pdf" target="_blank" rel="noopener noreferrer">全年齢向け提案書</a></li>
                      <li><a href="/assets/file/lexus/lexus_senior_presen.pdf" target="_blank" rel="noopener noreferrer">シニア向け提案書</a></li>
                      <li><a href="/assets/file/lexus/lexus_new_presen.pdf" target="_blank" rel="noopener noreferrer">新規・増車向け提案書</a></li>
                      <li><a href="/assets/file/lexus/lexus_corp_presen.pdf" target="_blank" rel="noopener noreferrer">法人向け提案書</a></li>
                      <li><a href="/assets/file/lexus/lexus_to_presen.pdf" target="_blank" rel="noopener noreferrer">海外赴任向け提案書</a></li>
                    </ul>
                  </li>
                  <li>提案力向上ムービー
                    <ul class="m-list__normal in-list">
                      <li><a href="https://youtu.be/Q_iX6YsiBRg" target="_blank" rel="noopener noreferrer">00.導入</a></li>
                      <li><a href="https://youtu.be/w5XZHSXjWfM" target="_blank" rel="noopener noreferrer">01.商品性・ポイント</a></li>
                      <li><a href="https://youtu.be/eoW-p_NCRBw" target="_blank" rel="noopener noreferrer">02.ターゲット別訴求内容</a></li>
                      <li><a href="https://youtu.be/fZdfdfiddLk" target="_blank" rel="noopener noreferrer">03.具体的提案ツール</a></li>
                      <li><a href="https://youtu.be/582vow7Uo_I" target="_blank" rel="noopener noreferrer">04.今後の商品強化</a></li>
                    </ul>
                  </li>
                  <li><a href="/assets/file/lexus/l_assistbook.pdf" target="_blank" rel="noopener noreferrer">KINTO ONE LEXUSセールスアシストブック</a></li>
                  <li><a href="/assets/file/common/tebiki.pdf" target="_blank" rel="noopener noreferrer">KINTO勉強法の手引き</a></li>
                  <li><a href="/assets/file/common/talkscript.pdf" target="_blank" rel="noopener noreferrer">トークスクリプト</a></li>
                  <li><a href="/assets/file/common/kinto_keiyakugamenn.pdf" target="_blank" rel="noopener noreferrer">KINTO契約画面遷移資料</a></li>
                </ul>
              </div>
              <div class="m-clm__child m-clm__child--02 p-tool__grid">
                <h2 class="m-hdg__02">お役立ちWEBサイト</h2>
                <ul class="m-list__normal p-tool__list">
                  <li><a href="https://kinto-jp.com/customer/dealer-kinto_one-contract-redirect?dlrflg=true" target="_blank" rel="noopener noreferrer">ご利用手順</a></li>
                  <li><a href="https://kinto-jp.com/customer/dealer-kinto_one-payment_simulation-redirect?dlrflg=true" target="_blank" rel="noopener noreferrer">KINTO料金比較ツール</a></li>
                  <li><a href="https://kinto-jp.com/customer/dealer-buy_estimate-redirect?dlrflg=true" target="_blank" rel="noopener noreferrer">買替えシミュレーション</a></li>
                </ul>
              </div>
              <div class="m-clm__child m-clm__child--02 p-tool__grid">
                <h2 class="m-hdg__02">マニュアル類</h2>
                <ul class="m-list__normal p-tool__list">
                  <li><a href="/assets/file/lexus/l_carchange.pdf" target="_blank" rel="noopener noreferrer">車種切替スケジュール</a></li>
                  <li><a href="/assets/file/lexus/l_docs.pdf" target="_blank" rel="noopener noreferrer">商品概要～各種手続きの流れ</a></li>
                </ul>
              </div>
              <div class="m-clm__child m-clm__child--02 p-tool__grid">
                <h2 class="m-hdg__02">モビリティマーケット</h2>
                <ul class="m-list__normal p-tool__list">
                  <li><a href="/assets/file/common/mobility_market_pamphlet.pdf" target="_blank" rel="noopener noreferrer">パンフレット</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="m-section__inner">
        <div class="m-btn__cnt m-btn__cnt--row">
          <div class="m-btn__02"><a href="https://nimbus.kinto-jp.com" target="_blank" rel="noopener noreferrer"><span class="m-btn__text">Nimbus（販売店業務管理Web）へ</span></a></div>
          <div class="m-btn__02"><a href="https://kinto-jp.com" target="_blank" data-module="btn-link" rel="noopener noreferrer"><span class="m-btn__text">KINTO 一般向けWEBサイトへ</span></a></div>
        </div>
      </section>
    </div>
  </div>
</template>



<script>

import Heading from "../../components/Heading"
export default ({
  components: {
    Heading
  },
  data() {
    return {
      opportunity: [
          {
            name: "カローラ クロスDH",
            file: "csuv_dh",
            filetype: "pdf"
          },
          {
            name: "KINTOお勧め車種一覧（基本Ver.）",
            file: "toyota_normal_presen",
            filetype: "pdf"
          },
          {
            name: "KINTOお勧め車種一覧（4WDVer.）",
            file: "toyota_4WD_presen",
            filetype: "pdf"
          },
          {
            name: "維持費・乗換費用比較表",
            file: "comparison",
            filetype: "xlsx"
          },
          {
            name: "KINTO ガイドブック",
            file: "csuvkinto_guidebook_dh",
            filetype: "pdf"
          },
        ]
    }
  }
})
</script>
