import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "@/pages/Policy/Policy.module.scss";

const PolicyPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = location.pathname.includes("privacy") ? "privacy" : "terms";

  useEffect(() => {
    if (location.pathname === "/policy") {
      navigate("/policy/privacy");
    }
  }, [location, navigate]);

  const renderContent = () => {
    if (activeTab === "terms") {
        return (
            <>
            <h1 className={styles.title}>[소분자 중개 서비스 이용 약관]</h1>
            <p>본 약관은 ‘소분자 중개 서비스’(이하 ‘서비스’라 합니다)를 운영하는 [프로젝트 야금야금](이하 ‘운영자’라 합니다)이 제공하는 서비스의 이용과 관련하여 운영자와 이용자 간의 권리, 의무 및 책임 사항, 기타 필요한 사항을 규정합니다.</p>

            <ul className={styles.list}>
                  <li className={styles.listItem}><span className={styles.highlight}>제1조 (목적)</span>
                  <span>이 약관은 운영자가 제공하는 서비스의 이용 조건 및 절차, 운영자와 이용자 간의 권리와 의무, 책임 및 기타 필요한 사항을 규정함을 목적으로 합니다.</span></li>

                  <li className={styles.listItem}><span className={styles.highlight}>제2조 (용어의 정의)</span>
                  <span>"서비스"란 운영자가 제공하는 소분자 간의 만남 주선 및 관련 정보를 제공하는 커뮤니티 플랫폼을 말합니다. "이용자"란 본 약관에 따라 서비스를 이용하는 자를 의미합니다. "게시물"이란 이용자가 서비스를 이용하며 업로드하거나 게시하는 글, 이미지, 동영상 등을 의미합니다.</span></li>

                  <li className={styles.listItem}><span className={styles.highlight}>제3조 (약관의 효력 및 변경)</span>
                  <span>본 약관은 이용자가 서비스에 가입하거나 이용을 시작한 시점부터 효력이 발생합니다. 운영자는 관련 법령을 위반하지 않는 범위에서 약관을 개정할 수 있으며, 개정 시 공지사항을 통해 사전 공지합니다. 개정된 약관에 동의하지 않는 경우 이용자는 서비스 이용을 중단하고 탈퇴할 수 있습니다.</span></li>

                  <li className={styles.listItem}><span className={styles.highlight}>제4조 (서비스 이용)</span>
                  <span>이용자는 자신의 판단과 책임 하에 서비스를 이용해야 하며, 서비스 내 거래 및 활동에 대한 모든 책임은 이용자에게 있습니다. 운영자는 이용자 간의 거래, 소분 활동 및 그에 따른 분쟁에 개입하지 않으며, 이에 대한 법적 책임을 지지 않습니다. 이용자는 대한민국의 위생법, 식품위생법, 기타 관련 법령을 준수해야 합니다.</span></li>

                  <li className={styles.listItem}><span className={styles.highlight}>제5조 (위생 및 안전 규정)</span>
                  <span>이용자는 소분 활동 시 대한민국의 식품위생법, 소비자 보호법, 전자상거래법 등 관련 법령을 준수해야 합니다. 소분 및 거래 과정에서 발생하는 식품 안전 및 위생 문제에 대해 운영자는 어떠한 책임도 지지 않습니다. 이용자는 개인 간 거래로 인한 위해 발생 시 스스로 책임지고 이를 해결해야 합니다.</span></li>

                  <li className={styles.listItem}><span className={styles.highlight}>제6조 (운영자의 책임 제한)</span>
                  <span>운영자는 서비스의 기술적 결함이나 시스템 장애로 인해 이용자에게 발생한 손해에 대해 고의 또는 중과실이 없는 한 책임을 지지 않습니다. 이용자 간 분쟁, 거래, 오해, 손실 등에 대해서는 운영자의 책임이 면제됩니다. 운영자는 불가항력적인 상황(천재지변, 시스템 장애 등)으로 인해 서비스를 제공할 수 없는 경우 그 책임이 면제됩니다.</span></li>

                  <li className={styles.listItem}><span className={styles.highlight}>제7조 (이용자의 의무)</span>
                  <span>이용자는 법령과 본 약관을 준수해야 하며, 운영자 및 타인의 권리를 침해하는 행위를 해서는 안 됩니다. 이용자는 서비스 이용 과정에서 타인에게 피해를 주거나 사회질서를 위반하지 않도록 주의해야 합니다.</span></li>

                  <li className={styles.listItem}><span className={styles.highlight}>제8조 (개인정보 보호)</span>
                  <span>운영자는 이용자의 개인정보를 보호하기 위해 관련 법령을 준수하며, 개인정보 보호정책을 따릅니다.</span></li>

                  <li className={styles.listItem}><span className={styles.highlight}>제9조 (서비스 중단 및 종료)</span>
                  <span>운영자는 천재지변, 전쟁, 통신 장애 등 불가항력적 상황이 발생할 경우 서비스 제공을 중단할 수 있습니다. 운영자는 서비스 운영상 필요에 따라 서비스를 변경, 중단하거나 종료할 수 있으며, 이를 사전에 공지합니다.</span></li>

                  <li className={styles.listItem}><span className={styles.highlight}>제10조 (분쟁 해결)</span>
                  <span>본 서비스와 관련된 분쟁은 대한민국 법령을 따르며, 관할 법원은 운영자의 주소지를 관할하는 법원으로 합니다. 운영자는 이용자 간 분쟁 해결을 위한 조정 또는 중재에 개입할 수 있으나, 법적 책임은 지지 않습니다.</span></li>

                  <li className={styles.listItem}><span className={styles.highlight}>부칙</span></li>
                  <span>본 약관은 동의일로부터 시작합니다.</span>
              </ul>
            </>
        );
      } else if (activeTab === "privacy") {
        return (
            <>
            <h2 className={styles.title}>1. 개인정보의 수집 및 이용에 대한 동의</h2>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <span className={styles.highlight}>가. 수집 및 이용 목적</span>                       
                    <br/>야금야금에서 운영하는 어플리케이션 기능 제공에 필요한 사항(회원가입, 실명인증)에 대하여
                    원활한 서비스 진행을 위하여 필요한 최소한의 범위 내에서 개인정보를 수집하고 있습니다.
                </li>
                <li className={styles.listItem}>
                    <span className={styles.highlight}>나. 수집 및 이용 항목</span>
                    <br/>1) 필수항목 : 성명(한글), 연락처, 전자우편
                </li>
                <li className={styles.listItem}>
                    <span className={styles.highlight}>다. 개인정보의 보유 및 이용 기간</span>
                    <br/>이용자의 개인정보 수집ㆍ이용에 관한 동의일로부터 회원탈퇴 시까지
                    위 이용목적을 위하여 보유 및 이용하게 됩니다.
                    <br/>단, 장기 미사용(12개월) 후에는 고용계약 유지, 민원처리, 분쟁해결 및 법령상 의무이행 등을
                    위하여 1년간 보유하게 됩니다.
                </li>
                <li className={styles.listItem}>
                    <span className={styles.highlight}>라. 동의를 거부할 권리 및 동의를 거부할 경우의 불이익이 있을 수 있습니다.</span>
                    <br/>
                    위 개인정보 중 필수정보의 수집ㆍ이용에 관한 동의는 서비스 진행을 위해 필수적이므로, 
                    <br/>위 사항에 동의하셔야만 서비스 이용이 가능합니다.
                    <br/>이용자 개인정보의 선택항목 제공 동의를 거부할 권리가 있습니다. 
                    다만, 지원자가 선택항목 동의를 거부하는 경우 원활한 서비스 이용이 어려워 회원가입 제한을 받을 수 있습니다.
                </li>
            </ul>

              <h1 className={styles.title}>2. 개인정보의 제3자 제공에 대한 동의</h1>
              <ul className={styles.list}>
                  <li className={styles.listItem}>
                      <span className={styles.highlight}>가. 제공 대상</span>: 야금야금 관련 신변사항에 대한 증명서 발급기관(부산대학교)
                  </li>
                  <li className={styles.listItem}>
                      <span className={styles.highlight}>나. 제공정보의 이용 목적</span>: 가입자 제출정보의 검증
                  </li>
                  <li className={styles.listItem}>
                      <span className={styles.highlight}>다. 제공하는 개인정보 항목</span>: 성명(한글), 연락처, 전자우편
                  </li>
                  <li className={styles.listItem}>
                      <span className={styles.highlight}>라. 제공정보의 보유 및 이용 기간</span>: 1년
                      <br />
                      <span className = {styles.smallItem}>
                        ※ 개인정보를 제공받는 자는 상기 이용목적 외에 개인정보를 이용할 수 없으며, 개인정보 보호법 등에서 정하는 바에 기록, 보관, 파기됩니다.
                      </span>
                  </li>
                  <li className={styles.listItem}>
                      <span className={styles.highlight}>마. 동의를 거부할 권리 및 동의를 거부할 경우의 불이익</span>
                      <br />이용자는 개인정보 제3자 제공 동의를 거부할 권리가 있습니다. 다만, 이용자가 동의를 거부하는 경우 원활한 서비스를 제공 할 수 없어 서비스 이용에 제한을 받을 수 있습니다.
                  </li>
              </ul>
        </>

        );
      }
    };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
      <button
          className={`${styles.headerButton} ${
            activeTab === "terms" ? styles.primaryButton : styles.secondaryButton
          }`}
          onClick={() => navigate("/policy/terms")}
        >
          서비스 이용약관
        </button>
        <button
          className={`${styles.headerButton} ${
            activeTab === "privacy" ? styles.primaryButton : styles.secondaryButton
          }`}
          onClick={() => navigate("/policy/privacy")}
        >
          개인정보처리방침
        </button>
      </div>
      <h1 className={styles.headTitle}>
        {activeTab === "terms" ? "서비스 이용약관" : "개인정보처리방침"}
      </h1>
      <div className={styles.contentWrapper}>
        <div className={styles.container}>{renderContent()}</div>
      </div>
    </div>
  );
};

export { PolicyPage };