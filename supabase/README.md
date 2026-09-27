# 족보Lab

이름의 항렬자(돌림자)와 본가 지역으로 본관·파·세대를 추정하고, 같은 가문의 역사 인물·독립운동가·친일반민족행위자를 보여주는 서비스. 화면은 `/jokbo`에 있다.

## 구조

| 경로 | 역할 |
|---|---|
| `lib/jokbo/data.ts` | **데이터 원본** (본관·파·항렬·인물) |
| `lib/jokbo/match.ts` | 추론 엔진 (순수 함수) |
| `app/api/genealogy/match/route.ts` | `POST /api/genealogy/match` |
| `app/jokbo/`, `components/jokbo/` | 모바일 우선 3단계 폼 + 결과 + 공유 카드 |
| `supabase/migrations/` | PostgreSQL 스키마 (+ `effective_hangryeol` 뷰) |
| `supabase/seed.sql` | `data.ts`에서 자동 생성 (`pnpm jokbo:seed`) |

## 명령

```sh
pnpm dev            # http://localhost:3000/jokbo
pnpm test           # 추론 엔진 테스트
pnpm jokbo:seed     # data.ts → supabase/seed.sql
```

## 점수

`본인×0.30 + 부×0.35 + 조부×0.25 + 지역×0.10`, 3대 연속 일치 시 +20 (최대 100).
각 사람의 점수: 한자·위치 일치 100, 한글만 일치 60, 한자는 같은데 위치가 다름 50, 한글은 같은데 위치가 다름 25, 한자 충돌 0.
30점 미만은 결론으로 제시하지 않는다. 본관을 모르는 경우 결론 없이 "본관을 특정하지 못했어요"를 표시한다.

## 데이터 원칙

- `generation_se`는 세(世) 기준(시조 = 1세)이다. 세손 = 세 − 1.
- `verified = false`는 샘플이거나 미검증인 데이터다. **현재 항렬자와 집성촌은 전부 샘플이다.**
- 친일(`collaborator`)은 친일반민족행위진상규명위원회의 공식 결정만 넣는다. DB CHECK로 `basis`를 필수로 두고, 엔진은 미검증 행을 노출하지 않는다.
- 본관이 같다고 직계 관계인 것은 아니다. UI는 "같은 본관·같은 파 인물"로만 표기한다.
- 입력한 이름은 서버에 저장하지 않는다. 브라우저에서는 sessionStorage에만 두어 탭을 닫으면 사라진다.
