import SwiftUI
import WebKit

@main
struct BOCDemoApp: App {
    var body: some Scene {
        WindowGroup {
            OfflineBankView()
                .ignoresSafeArea()
                .preferredColorScheme(.light)
        }
    }
}

struct OfflineBankView: UIViewRepresentable {
    func makeCoordinator() -> Coordinator { Coordinator() }

    func makeUIView(context: Context) -> WKWebView {
        let configuration = WKWebViewConfiguration()
        configuration.websiteDataStore = .default()
        let view = WKWebView(frame: .zero, configuration: configuration)
        view.navigationDelegate = context.coordinator
        view.isOpaque = false
        view.backgroundColor = UIColor(red: 0.965, green: 0.965, blue: 0.973, alpha: 1)
        view.scrollView.contentInsetAdjustmentBehavior = .never
        view.scrollView.bounces = false
        view.allowsLinkPreview = false
        if let file = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "Web") {
            view.loadFileURL(file, allowingReadAccessTo: file.deletingLastPathComponent())
        } else {
            view.loadHTMLString("<meta name='viewport' content='width=device-width'><p>离线页面加载失败，请重新安装演示包。</p>", baseURL: nil)
        }
        return view
    }

    func updateUIView(_ view: WKWebView, context: Context) {}

    final class Coordinator: NSObject, WKNavigationDelegate {
        func webView(_ webView: WKWebView, decidePolicyFor action: WKNavigationAction,
                     decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
            // This demonstration has no network destinations, login, or bank service access.
            let scheme = action.request.url?.scheme
            decisionHandler(scheme == "file" || scheme == "about" ? .allow : .cancel)
        }
    }
}
