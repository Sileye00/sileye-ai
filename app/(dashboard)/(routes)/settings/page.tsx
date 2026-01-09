import { Settings, User, CreditCard, Bell, Shield, Palette } from "lucide-react"

import { Heading } from "@/components/heading"
import { checkSubscription } from "@/lib/subscription";
import { SubscriptionButton } from "@/components/subscription-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


const SettingsPage = async () => {
    const isPro = await checkSubscription();
    
    return (
        <div className="h-full bg-gradient-to-br from-slate-50 via-white to-gray-50">
            <div className="bg-white/80 backdrop-blur-sm border-b border-slate-100">
                <Heading
                    title="Settings"
                    description="Manage your account settings and preferences"
                    icon={Settings}
                    iconColor="text-slate-700"
                    bgColor="bg-slate-700/10"
                />
            </div>
            <div className="px-4 lg:px-8 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                    
                    {/* Subscription Card */}
                    <Card className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg">
                                    <CreditCard className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl">Subscription Plan</CardTitle>
                                    <CardDescription>Manage your subscription and billing</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl border">
                                <div>
                                    <p className="font-semibold text-slate-800">
                                        {isPro ? "Pro Plan" : "Free Plan"}
                                    </p>
                                    <p className="text-sm text-slate-600">
                                        {isPro ? "Unlimited access to all features" : "Limited access with usage restrictions"}
                                    </p>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    isPro ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                                }`}>
                                    {isPro ? "Active" : "Basic"}
                                </div>
                            </div>
                            <SubscriptionButton isPro={isPro} />
                        </CardContent>
                    </Card>

                    {/* Account Info Card */}
                    <Card className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                                    <User className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl">Account Information</CardTitle>
                                    <CardDescription>Your account details and preferences</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                                    <span className="text-sm font-medium text-slate-700">Account Type</span>
                                    <span className="text-sm text-slate-600">Personal</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                                    <span className="text-sm font-medium text-slate-700">Member Since</span>
                                    <span className="text-sm text-slate-600">2026</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                                    <span className="text-sm font-medium text-slate-700">Status</span>
                                    <span className="text-sm text-green-600 font-medium">Active</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Preferences Card */}
                    <Card className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
                                    <Palette className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl">Preferences</CardTitle>
                                    <CardDescription>Customize your experience</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                                    <span className="text-sm font-medium text-slate-700">Theme</span>
                                    <span className="text-sm text-slate-600">Light Mode</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                                    <span className="text-sm font-medium text-slate-700">Language</span>
                                    <span className="text-sm text-slate-600">English</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                                    <span className="text-sm font-medium text-slate-700">Auto-save</span>
                                    <span className="text-sm text-green-600 font-medium">Enabled</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Security Card */}
                    <Card className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg">
                                    <Shield className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl">Security & Privacy</CardTitle>
                                    <CardDescription>Manage your security settings</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                                    <span className="text-sm font-medium text-slate-700">Two-Factor Auth</span>
                                    <span className="text-sm text-green-600 font-medium">Enabled</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                                    <span className="text-sm font-medium text-slate-700">Data Encryption</span>
                                    <span className="text-sm text-green-600 font-medium">Active</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                                    <span className="text-sm font-medium text-slate-700">Privacy Mode</span>
                                    <span className="text-sm text-slate-600">Standard</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default SettingsPage;