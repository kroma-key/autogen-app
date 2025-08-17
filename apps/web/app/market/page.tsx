import { Search } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"

export default function PixelMarket() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">픽셀마켓</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="검색..." className="pl-10 w-80" />
            </div>
            <Button variant="outline">코그인</Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-60 bg-gray-800 text-white min-h-screen">
          <nav className="p-6">
            <ul className="space-y-4">
              <li>
                <a href="#" className="block py-3 px-4 text-lg hover:bg-gray-700 rounded">
                  내 광고 관리
                </a>
              </li>
              <li>
                <a href="#" className="block py-3 px-4 text-lg hover:bg-gray-700 rounded">
                  광고주 센터
                </a>
              </li>
              <li>
                <a href="#" className="block py-3 px-4 text-lg hover:bg-gray-700 rounded">
                  입점하기
                </a>
              </li>
              <li>
                <a href="#" className="block py-3 px-4 text-lg hover:bg-gray-700 rounded">
                  이벤트 존
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Grid Layout */}
          <div className="grid grid-cols-12 gap-4 mb-12">
            {/* Top AD block */}
            <div className="col-span-2 col-start-4 row-start-1">
              <div className="bg-red-500 text-white p-4 text-center font-bold text-lg rounded">AD</div>
            </div>

            {/* Center cluster of blocks */}
            <div className="col-span-3 col-start-5 row-start-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-blue-500 text-white p-4 text-center font-bold text-lg rounded">AD</div>
                <div className="bg-orange-400 text-white p-4 text-center font-bold text-sm rounded">브랜드</div>
                <div className="bg-yellow-400 text-gray-800 p-4 text-center font-bold text-sm rounded">상품</div>
                <div className="bg-red-600 text-white p-4 text-center font-bold text-sm rounded">할인</div>
              </div>
            </div>

            {/* Example ad popup */}
            <div className="col-span-3 col-start-7 row-start-4">
              <div className="bg-white border-2 border-gray-300 rounded-lg p-4 shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-blue-500 text-white px-3 py-1 rounded font-bold">AD</div>
                  <div>
                    <div className="font-bold text-gray-900">예광고</div>
                    <div className="text-sm text-gray-600">국내최고의 서기업 플랫폼입니다.</div>
                  </div>
                </div>
                <div className="text-blue-600 text-sm">example.com</div>
              </div>
            </div>

            {/* Logo block */}
            <div className="col-span-2 col-start-4 row-start-6">
              <div className="bg-green-500 text-white p-4 text-center font-bold text-lg rounded">logo</div>
            </div>

            {/* Right side AD blocks */}
            <div className="col-span-1 col-start-9 row-start-6">
              <div className="bg-purple-500 text-white p-4 text-center font-bold text-lg rounded">AD</div>
            </div>

            <div className="col-span-1 col-start-11 row-start-7">
              <div className="bg-red-500 text-white p-4 text-center font-bold text-xl rounded">A</div>
            </div>
          </div>

          {/* Bottom Sections */}
          <div className="grid grid-cols-2 gap-12">
            {/* Top Click Rate Ads */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">클릭률 TOP 광고</h2>
              <div className="flex gap-4">
                <div className="bg-red-500 text-white p-8 text-center font-bold text-2xl rounded-lg flex-1">AD</div>
                <div className="bg-gradient-to-r from-red-400 via-green-400 to-yellow-400 text-white p-8 text-center font-bold text-lg rounded-lg flex-1">
                  BRAND
                </div>
                <div className="bg-blue-700 text-white p-8 text-center font-bold text-lg rounded-lg flex-1">shop</div>
              </div>
            </div>

            {/* New Store Ads */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">신규 입점 광고</h2>
              <div className="flex gap-4">
                <div className="bg-yellow-400 text-gray-900 p-8 text-center font-bold text-2xl rounded-lg flex-1">
                  AD
                </div>
                <div className="bg-blue-800 text-white p-8 text-center font-bold text-2xl rounded-lg flex-1">AD</div>
                <div className="bg-blue-600 text-white p-8 text-center font-bold text-lg rounded-lg flex-1">SHOP</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}