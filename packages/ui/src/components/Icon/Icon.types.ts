/**
 * 아이콘 이름 규칙: Ico + PascalCase
 * 총 247개 아이콘
 */
export const ICON_CATEGORIES = {
  direction: [
    'IcoArrowLeft', 'IcoArrowRight', 'IcoArrowUp', 'IcoArrowDown',
    'IcoChevronLeft', 'IcoChevronRight', 'IcoChevronUp', 'IcoChevronDown',
  ],
  action: [
    'IcoSearch', 'IcoAdd', 'IcoClose', 'IcoDelete', 'IcoEdit',
    'IcoShare', 'IcoDownload', 'IcoUpload', 'IcoCopy', 'IcoFilter',
  ],
  content: [
    'IcoHeart', 'IcoHeartLine', 'IcoBookmark', 'IcoBookmarkLine',
    'IcoStar', 'IcoStarLine', 'IcoCheck', 'IcoCheckCircle', 'IcoInfo',
  ],
  travel: [
    'IcoFlight', 'IcoHotel', 'IcoCalendar', 'IcoLocationOn',
    'IcoLuggage', 'IcoCar', 'IcoBus', 'IcoTrain',
  ],
  ui: [
    'IcoMenu', 'IcoHome', 'IcoPerson', 'IcoSettings',
    'IcoNotification', 'IcoCamera', 'IcoImage', 'IcoLink',
  ],
} as const;

export interface IconProps {
  /**
   * 아이콘 이름. 반드시 Ico + PascalCase 형식.
   * 예: IcoArrowLeft, IcoSearch, IcoHeart
   */
  name: string;
  /** 아이콘 크기 (px 기준). 기본값: 24 */
  size?: number;
  /** 아이콘 색상. 미지정 시 currentColor 상속 */
  color?: string;
}
