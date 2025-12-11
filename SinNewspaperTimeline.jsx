import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

const SinNewspaperTimeline = () => {
  const [activeLayer, setActiveLayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [interviewTabs, setInterviewTabs] = useState([]);
  const [expandedTab, setExpandedTab] = useState(null);
  const [showInstagram, setShowInstagram] = useState(false);
  const audioRef = useRef(null);

  // sin1-14: 타임라인 데이터 (1938-2025)
  const sinLayers = [
    { id: 1, year: 1938, newspaper: '동아일보', date: '1938.11.20', location: '서울', era: '일제강점기 (1910~1945)', image: 'sin1.png', typeface: '산세리프 단순화, 한자 기반의 한글', context: '일제의 검열이 심했던 시기, 일본제 약 광고 속 글자' },
    { id: 2, year: 1964, newspaper: '경향신문', date: '1964.05.20', location: '서울', era: '산업화/군사정권 (1960~1980)', image: 'sin2.png', typeface: '불규칙적인 한자 레터링', context: '해방 직후, 검열이 심한 시기 아직 한자에서 벗어나지 못한 고유명사' },
    { id: 3, year: 1980, newspaper: '동아일보', date: '1980', location: '서울', era: '산업화/군사정권 (1960~1980)', image: 'sin3.png', typeface: '굵은 명조, 획 간격 안정적', context: '언론의 왜곡과 탄압' },
    { id: 4, year: 1980, newspaper: '경향신문', date: '1980', location: '서울', era: '산업화/군사정권 (1960~1980)', image: 'sin4.png', typeface: '굵은 명조, 직선적 안정감', context: '보수적/권위적, 정권과 긴밀한 관계' },
    { id: 5, year: 1980, newspaper: '매일경제', date: '1980', location: '서울', era: '산업화/군사정권 (1960~1980)', image: 'sin5.png', typeface: '명조/고딕/혼합, 5.18 영향', context: '5.18 민주화운동 이후 저항 언론' },
    { id: 6, year: 1993, newspaper: '조선일보', date: '1993.9.2', location: '서울', era: '민주화~현대 (1980~2000)', image: 'sin6.png', typeface: '세리프 헤드라인', context: '한글의 디지털화 진행으로 서체 개발' },
    { id: 7, year: 1997, newspaper: '동아일보', date: '1997.11.15', location: '서울', era: '민주화~현대 (1980~2000)', image: 'sin7.png', typeface: '명조체', context: '김영삼 대통령 대선 시기 당시, 신한국당과의 마찰로서 언론이 기능' },
    { id: 8, year: 1997, newspaper: '동아일보', date: '1997.11.15', location: '서울', era: '민주화~현대 (1980~2000)', image: 'sin8.png', typeface: '산세리프 계열의 커스텀 폰트', context: '하나로 통신이라는 회사 로고로, 인터넷 보급이 보편화됨' },
    { id: 9, year: 1999, newspaper: '경향신문', date: '1999.7.20', location: '서울', era: '민주화~현대 (1980~2000)', image: 'sin9.png', typeface: '굵은 명조체', context: '인터넷이 언론/정보 유통 채널로 본격 등장' },
    { id: 10, year: 2020, newspaper: '조선일보', date: '2020', location: '서울', era: '디지털 시대 (2000~현재)', image: 'sin10.png', typeface: '굵은 고딕체(제목)/명조체(본문)', context: '코로나19 발생/장기화' },
    { id: 11, year: 2020, newspaper: '조선일보', date: '2020', location: '서울', era: '디지털 시대 (2000~현재)', image: 'sin11.png', typeface: '굵은 고딕체(제목), 명조체(본문)', context: '코로나19 발생/장기화' },
    { id: 12, year: 2021, newspaper: '매일경제', date: '2021', location: '서울', era: '디지털 시대 (2000~현재)', image: 'sin12.png', typeface: '명조체, 고딕체 혼용', context: '코로나19 장기화/백신개발' },
    { id: 13, year: 2025, newspaper: '서울신문', date: '2025.04.04', location: '서울', era: '디지털 시대 (2000~현재)', image: 'sin13.png', typeface: '획의 굵기가 비교적 일정하며, 특히 세로획이 강조되어 안정적인 느낌을 주고 현대적 느낌을 줌', context: '2025년 4월 4일, 윤석열 대통령의 탄핵 당시 호외를 배포했던 신문사' },
    { id: 14, year: 2025, newspaper: '새로운 신', date: '2025.09.06', location: '창작', era: '디지털 시대 (2000~현재)', image: 'sin14.png', typeface: '세 명의 기록자가 수집한 13개의 신을 바탕으로 창조된 형태', context: '1938년부터 2025년까지의 기록 위에서 스스로 사고하고 판단하는 새로운 신을 창조함' },
  ];

  // 최종 포스터 (별도 이미지)
  const finalPoster = {
    image: 'final-poster.png',
    title: '《신:   》최종 포스터',
    date: '2025.09.06',
    description: '1938년부터 2025년까지 수집한 14개의 \'신\' 기록을 담은 최종 포스터',
    context: '세 명의 기록자가 87년간의 신문 기록을 바탕으로 완성한 작품',
    instagramUrl: 'https://www.instagram.com/p/DPxpMKKj0oG/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
  };

  // 인터뷰 데이터
  const interviews = [
    { name: '기록자 A', role: '리듬 분석가', quote: '16분음표로 박수를 치며 리듬을 체감했습니다. 하지만 기계는 1300BPM이 넘는 초고속 루프를 발견했죠. 인간의 감각과 기계의 측정 사이에는 이런 간극이 존재합니다.' },
    { name: '기록자 B', role: '문자 수집가', quote: '신문 속 \'신\'자를 수집하며 각 시대의 맥락을 읽었습니다. 같은 글자지만, 인쇄 방식, 서체, 배치가 모두 달랐어요. 글자는 시대의 지문입니다.' },
    { name: '기록자 C', role: '레이어 구성가', quote: '트레이싱지를 겹치며 과거와 현재가 동시에 존재하는 순간을 만들고 싶었습니다. 투명도는 시간의 거리이고, 겹침은 역사의 무게입니다.' },
  ];

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // 인터뷰 탭 자동 생성
  useEffect(() => {
    const createInterviewTab = () => {
      const randomIndex = Math.floor(Math.random() * interviews.length);
      const tabId = Date.now();
      
      setInterviewTabs(prev => [...prev, {
        id: tabId,
        interviewIndex: randomIndex,
        timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
      }]);

      setTimeout(() => {
        setInterviewTabs(prev => prev.filter(tab => tab.id !== tabId));
        if (expandedTab === tabId) {
          setExpandedTab(null);
        }
      }, 60000);
    };

    const initialTimer = setTimeout(createInterviewTab, 5000);
    const intervalTimer = setInterval(createInterviewTab, 30000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, []);

  const toggleTab = (tabId) => {
    setExpandedTab(expandedTab === tabId ? null : tabId);
  };

  const closeTab = (tabId, e) => {
    e.stopPropagation();
    setInterviewTabs(prev => prev.filter(tab => tab.id !== tabId));
    if (expandedTab === tabId) {
      setExpandedTab(null);
    }
  };

  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      background: '#f5f5f0',
      fontFamily: '"Noto Serif KR", "Nanum Myeongjo", serif',
      color: '#1a1a1a',
    }}>
      {/* Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '1.5rem 2rem',
        background: 'rgba(245, 245, 240, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
      }}>
        <h1 style={{
          fontSize: '1.8rem',
          fontWeight: 700,
          margin: 0,
          letterSpacing: '0.05em',
        }}>《신:&nbsp;&nbsp;&nbsp;》</h1>
        <p style={{
          fontSize: '0.75rem',
          margin: '0.25rem 0 0 0',
          opacity: 0.6,
          letterSpacing: '0.1em',
        }}>1938 - 2025 | 14개의 기록과 최종 포스터</p>
      </header>

      {/* Main Timeline */}
      <main style={{
        paddingTop: '120px',
        overflowX: 'auto',
        overflowY: 'hidden',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '3rem',
          padding: '2rem 4rem',
          minWidth: 'fit-content',
        }}>
          {/* Timeline Label */}
          <div style={{
            position: 'sticky',
            left: '2rem',
            fontSize: '0.8rem',
            opacity: 0.5,
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            letterSpacing: '0.2em',
            fontWeight: 600,
            zIndex: 10,
            background: '#f5f5f0',
            padding: '1rem 0',
          }}>
            1938 → 2025
          </div>

          {/* Sin Layers */}
          {sinLayers.map((layer) => (
            <div
              key={layer.id}
              onMouseEnter={() => setActiveLayer(layer.id)}
              onMouseLeave={() => setActiveLayer(null)}
              style={{
                width: '250px',
                flexShrink: 0,
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: activeLayer === layer.id ? 'translateY(-10px) scale(1.05)' : 'translateY(0) scale(1)',
              }}
            >
              <div style={{
                width: '100%',
                height: '350px',
                backgroundImage: `url(${layer.image})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: activeLayer === layer.id ? 1 : 0.7,
                filter: activeLayer === layer.id ? 'none' : 'grayscale(10%)',
                transition: 'all 0.4s',
              }} />
              <div style={{
                marginTop: '1rem',
                textAlign: 'center',
              }}>
                <div style={{
                  fontSize: '0.7rem',
                  opacity: 0.5,
                  marginBottom: '0.25rem',
                  letterSpacing: '0.1em',
                }}>{layer.year}</div>
                <div style={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                }}>{layer.newspaper}</div>
              </div>
            </div>
          ))}

          {/* Divider */}
          <div style={{
            width: '2px',
            height: '400px',
            background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.3), transparent)',
            margin: '0 2rem',
            flexShrink: 0,
          }} />

          {/* Final Poster */}
          <div
            onClick={() => setShowInstagram(true)}
            onMouseEnter={() => setActiveLayer('poster')}
            onMouseLeave={() => setActiveLayer(null)}
            style={{
              width: '500px',
              flexShrink: 0,
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
            }}
          >
            <div style={{
              width: '100%',
              height: '700px',
              backgroundImage: `url(${finalPoster.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '2px solid rgba(0,0,0,0.1)',
              position: 'relative',
              transition: 'all 0.4s',
              transform: activeLayer === 'poster' ? 'scale(1.02)' : 'scale(1)',
            }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                background: activeLayer === 'poster' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.3s',
                color: '#fff',
                fontSize: '1.2rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
              }}>
                {activeLayer === 'poster' && 'Instagram →'}
              </div>
            </div>
            <div style={{
              marginTop: '1.5rem',
              textAlign: 'center',
              fontSize: '1rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
            }}>
              《신:&nbsp;&nbsp;&nbsp;》최종 포스터
            </div>
            <div style={{
              marginTop: '0.5rem',
              textAlign: 'center',
              fontSize: '0.75rem',
              opacity: 0.6,
            }}>
              {finalPoster.date}
            </div>
          </div>
        </div>
      </main>

      {/* Layer Info Panel */}
      {activeLayer && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          left: '2rem',
          padding: '1.5rem',
          background: 'rgba(26, 26, 26, 0.95)',
          color: '#f5f5f0',
          borderRadius: '2px',
          maxWidth: '400px',
          animation: 'fadeIn 0.3s ease-out',
          zIndex: 1000,
        }}>
          {activeLayer === 'poster' ? (
            <>
              <div style={{
                fontSize: '0.7rem',
                opacity: 0.5,
                marginBottom: '0.5rem',
                letterSpacing: '0.15em',
              }}>최종 포스터</div>
              <div style={{
                fontSize: '1.3rem',
                fontWeight: 700,
                marginBottom: '0.5rem',
              }}>{finalPoster.title}</div>
              <div style={{
                fontSize: '0.85rem',
                opacity: 0.7,
                marginBottom: '1rem',
              }}>제작 일자: {finalPoster.date}</div>
              <div style={{
                fontSize: '0.8rem',
                lineHeight: '1.6',
                opacity: 0.8,
              }}>{finalPoster.description}</div>
              <div style={{
                marginTop: '1rem',
                padding: '0.75rem',
                background: 'rgba(245, 245, 240, 0.1)',
                borderLeft: '2px solid rgba(245, 245, 240, 0.3)',
                fontSize: '0.8rem',
                lineHeight: '1.5',
              }}>
                {finalPoster.context}
              </div>
            </>
          ) : (
            <>
              {(() => {
                const layer = sinLayers.find(l => l.id === activeLayer);
                return (
                  <>
                    <div style={{
                      fontSize: '0.7rem',
                      opacity: 0.5,
                      marginBottom: '0.5rem',
                      letterSpacing: '0.15em',
                    }}>{layer.era}</div>
                    <div style={{
                      fontSize: '0.75rem',
                      opacity: 0.6,
                      marginBottom: '0.5rem',
                      letterSpacing: '0.1em',
                    }}>기록 #{layer.id} · {layer.location}</div>
                    <div style={{
                      fontSize: '1.3rem',
                      fontWeight: 700,
                      marginBottom: '0.5rem',
                    }}>{layer.newspaper}</div>
                    <div style={{
                      fontSize: '0.85rem',
                      opacity: 0.7,
                      marginBottom: '1rem',
                    }}>발행일: {layer.date}</div>
                    <div style={{
                      padding: '0.75rem 0',
                      borderTop: '1px solid rgba(245, 245, 240, 0.2)',
                      marginBottom: '0.75rem',
                    }}>
                      <div style={{
                        fontSize: '0.7rem',
                        opacity: 0.5,
                        marginBottom: '0.25rem',
                        letterSpacing: '0.1em',
                      }}>서체 특징</div>
                      <div style={{
                        fontSize: '0.85rem',
                        lineHeight: '1.5',
                      }}>{layer.typeface}</div>
                    </div>
                    <div style={{
                      fontSize: '0.8rem',
                      lineHeight: '1.6',
                      opacity: 0.8,
                      fontStyle: 'italic',
                    }}>{layer.context}</div>
                  </>
                );
              })()}
            </>
          )}
        </div>
      )}

      {/* Instagram Popup */}
      {showInstagram && (
        <>
          <div
            onClick={() => setShowInstagram(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              zIndex: 2000,
              animation: 'fadeIn 0.3s ease-out',
            }}
          />
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(26, 26, 26, 0.98)',
            color: '#f5f5f0',
            padding: '2.5rem',
            borderRadius: '2px',
            maxWidth: '400px',
            zIndex: 2001,
            animation: 'messagePopup 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}>
            <button
              onClick={() => setShowInstagram(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                color: '#f5f5f0',
                fontSize: '1.5rem',
                cursor: 'pointer',
                opacity: 0.5,
                transition: 'opacity 0.3s',
              }}
              onMouseEnter={(e) => e.target.style.opacity = '1'}
              onMouseLeave={(e) => e.target.style.opacity = '0.5'}
            >
              ×
            </button>
            <div style={{
              fontSize: '1.2rem',
              fontWeight: 700,
              marginBottom: '1.5rem',
            }}>Instagram</div>
            <a
              href={finalPoster.instagramUrl || "https://www.instagram.com/"}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                padding: '1rem',
                background: 'rgba(245, 245, 240, 0.1)',
                border: '1px solid rgba(245, 245, 240, 0.3)',
                color: '#f5f5f0',
                textDecoration: 'none',
                textAlign: 'center',
                borderRadius: '2px',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(245, 245, 240, 0.2)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(245, 245, 240, 0.1)'}
            >
              프로젝트 보러가기 →
            </a>
            <div style={{
              marginTop: '1rem',
              fontSize: '0.7rem',
              opacity: 0.5,
              textAlign: 'center',
            }}>
              인스타그램으로 이동합니다
            </div>
          </div>
        </>
      )}

      {/* Audio Player */}
      <div style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem 1.5rem',
        background: 'rgba(26, 26, 26, 0.95)',
        color: '#f5f5f0',
        borderRadius: '2px',
        zIndex: 1000,
      }}>
        <Volume2 size={18} style={{ opacity: 0.6 }} />
        <div style={{
          fontSize: '0.9rem',
          letterSpacing: '0.05em',
        }}>그리드쉬프트</div>
        <button
          onClick={toggleAudio}
          style={{
            background: 'none',
            border: '1px solid rgba(245, 245, 240, 0.3)',
            color: '#f5f5f0',
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s',
          }}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <audio ref={audioRef} loop>
          <source src="gridshift.mp3" type="audio/mpeg" />
        </audio>
      </div>

      {/* Interview Tabs */}
      <div style={{
        position: 'fixed',
        bottom: '6rem',
        right: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        zIndex: 1500,
        maxHeight: '60vh',
        overflowY: 'auto',
      }}>
        {interviewTabs.map((tab) => {
          const interview = interviews[tab.interviewIndex];
          const isExpanded = expandedTab === tab.id;
          
          return (
            <div
              key={tab.id}
              onClick={() => toggleTab(tab.id)}
              style={{
                background: 'rgba(26, 26, 26, 0.95)',
                color: '#f5f5f0',
                borderRadius: '2px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                width: isExpanded ? '400px' : '280px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                animation: 'slideIn 0.4s ease-out',
              }}
            >
              <div style={{
                padding: '1rem',
                borderBottom: isExpanded ? '1px solid rgba(245, 245, 240, 0.2)' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '0.7rem',
                    opacity: 0.5,
                    letterSpacing: '0.1em',
                    marginBottom: '0.25rem',
                  }}>{tab.timestamp}</div>
                  <div style={{
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    letterSpacing: '0.02em',
                  }}>{interview.name}</div>
                  {!isExpanded && (
                    <div style={{
                      fontSize: '0.75rem',
                      opacity: 0.6,
                      marginTop: '0.25rem',
                    }}>{interview.role}</div>
                  )}
                </div>
                <button
                  onClick={(e) => closeTab(tab.id, e)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#f5f5f0',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    opacity: 0.5,
                    transition: 'opacity 0.3s',
                    padding: '0.25rem',
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = '1'}
                  onMouseLeave={(e) => e.target.style.opacity = '0.5'}
                >
                  ×
                </button>
              </div>

              {isExpanded && (
                <div style={{
                  padding: '1rem',
                  animation: 'fadeIn 0.3s ease-out',
                }}>
                  <div style={{
                    fontSize: '0.8rem',
                    opacity: 0.6,
                    marginBottom: '1rem',
                    letterSpacing: '0.05em',
                  }}>{interview.role}</div>
                  <blockquote style={{
                    margin: 0,
                    padding: '1rem 0',
                    lineHeight: '1.7',
                    fontSize: '0.9rem',
                    borderTop: '1px solid rgba(245, 245, 240, 0.2)',
                    borderBottom: '1px solid rgba(245, 245, 240, 0.2)',
                  }}>
                    "{interview.quote}"
                  </blockquote>
                  <div style={{
                    marginTop: '1rem',
                    fontSize: '0.65rem',
                    opacity: 0.4,
                    textAlign: 'right',
                    letterSpacing: '0.1em',
                  }}>
                    60초 후 자동 삭제
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;700;900&display=swap');
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes messagePopup {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        * {
          box-sizing: border-box;
        }

        button {
          font-family: 'Noto Serif KR', 'Nanum Myeongjo', serif;
        }

        /* 스크롤바 스타일링 */
        ::-webkit-scrollbar {
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default SinNewspaperTimeline;
